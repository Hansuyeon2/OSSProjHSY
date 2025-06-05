from datetime import date, datetime, time
import calendar
import random
from collections import defaultdict

from django.utils import timezone
from django.utils.timezone import make_aware
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .models import Diary, NightDiary, Report
from .serializers import *
from .contents.book import *


class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(username=self.request.user)

    #  달력
    @action(methods=['get'], detail=False, url_path='cal')
    def calendar(self, request):
        year = int(request.query_params.get('year'))
        month = int(request.query_params.get('month'))

        last_day = calendar.monthrange(year, month)[1]

        tz = timezone.get_current_timezone()
        start = make_aware(datetime.combine(date(year, month, 1), time.min), timezone=tz)
        end = make_aware(datetime.combine(date(year, month, last_day), time.max), timezone=tz)

        diaries = Diary.objects.filter(
            username=request.user,
            created_at__range=(start, end)
        ).order_by('-created_at')

        callist = {}
        for diary in diaries:
            newdate = timezone.localtime(diary.created_at).date().isoformat()
            callist.setdefault(newdate, {
                "id": diary.id,
                "content": diary.content,
                "created_at": timezone.localtime(diary.created_at).isoformat(),
                "main_emotion": diary.main_emotion
            })

        return Response(callist)

    #  리스트
    @action(methods=['get'], detail=False, url_path='list')
    def diarylist(self, request):
        year = int(request.query_params.get('year'))
        month = int(request.query_params.get('month'))

        last_day = calendar.monthrange(year, month)[1]

        tz = timezone.get_current_timezone()
        start = make_aware(datetime.combine(date(year, month, 1), time.min), timezone=tz)
        end = make_aware(datetime.combine(date(year, month, last_day), time.max), timezone=tz)

        diaries = Diary.objects.filter(
            username=request.user,
            created_at__range=(start, end)
        ).order_by('-created_at')

        return Response([
            {
                "id": d.id,
                "created_at": timezone.localtime(d.created_at).isoformat(),
                "content": d.content,
                "main_emotion": d.main_emotion
            }
            for d in diaries
        ])

    # detail
    def list(self, request, *args, **kwargs):
        strdate = request.query_params.get('date')
        if not strdate:
            return super().list(request, *args, **kwargs)

        date_obj = datetime.strptime(strdate, "%Y-%m-%d").date()
        today = datetime.now().date()

        if date_obj < today:
            night_diary = NightDiary.objects.filter(user=request.user, date=date_obj).first()

            if not night_diary:
                serializer = NightDiarySerializer(data={"date": date_obj}, context={'request': request})
                serializer.is_valid(raise_exception=True)
                night_diary = serializer.save()

            serializer = NightDiarySerializer(night_diary)
            return Response(serializer.data)

        diaries = Diary.objects.filter(
            username=request.user,
            created_at__date=date_obj
        ).order_by('-created_at')

        serializer = DiarySerializer(diaries, many=True)
        return Response({"entries": serializer.data})


class ReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, year, month):
        user = request.user
        report = Report.objects.filter(user=user, year=year, month=month).first()

        # ❗ 자동 생성 로직 시작
        if not report:
            diaries = Diary.objects.filter(
                username=user,
                created_at__year=year,
                created_at__month=month
            )

            if not diaries.exists():
                return Response({"detail": "해당 월의 감정 일기가 없습니다."}, status=400)

            main_list = [d.main_emotion for d in diaries if d.main_emotion]
            main_counter = Counter(main_list)

            sub_list = []
            for d in diaries:
                if isinstance(d.sub_emotion, list):
                    sub_list.extend(d.sub_emotion)
            sub_counter = Counter(sub_list)

            weekly_raw = defaultdict(list)
            for d in diaries:
                local_date = timezone.localtime(d.created_at).date()
                week_num = (local_date.day - 1) // 7 + 1
                weekly_raw[f"week{week_num}"].append(d.main_emotion)

            weekly_result = {}
            for i in range(1, 6):  # week1 ~ week5까지 고정 루프
                week_key = f"week{i}"
                emos = weekly_raw.get(week_key, [])

                if emos:
                    weekly_result[week_key] = Counter(emos).most_common(1)[0][0]
                else:
                    weekly_result[week_key] = "일기를 작성하지 않으셨네요"


            report = Report.objects.create(
                user=user,
                year=year,
                month=month,
                main_emotion=dict(main_counter),
                sub_emotion=dict(sub_counter),
                weekly_emotion=weekly_result
            )

        # 리포트 응답 반환
        return Response({
            "year": report.year,
            "month": report.month,
            "main_emotion": report.main_emotion,
            "sub_emotion": report.sub_emotion,
            "weekly_emotion": report.weekly_emotion
        })

class MonthlyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        year = int(request.query_params.get('year'))
        user = request.user

        reports = Report.objects.filter(user=user, year=year)
        result = []

        for report in reports:
            main_emotions = report.main_emotion or {}
            if not main_emotions:
                continue

            top_emotion = max(main_emotions.items(), key=lambda x: x[1])[0]
            result.append({
                "month": report.month,
                "emotion": top_emotion
            })

        result.sort(key=lambda x: x["month"])  

        return Response({
            "year": year,
            "reports": result
        })