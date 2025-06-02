import calendar
import random
from datetime import date, datetime
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Diary, NightDiary
from .serializers import *
from .contents.book import *

class DiaryViewSet(viewsets.ModelViewSet):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(username=self.request.user)
    #달력
    @action(methods=['get'], detail=False,url_path='cal')
    def calendar(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        year = int(year)
        month = int(month)

        start = date(year, month, 1)
        last_day = calendar.monthrange(year,month)[1]
        end = date(year, month, last_day)

        diaries = Diary.objects.filter(
            username = request.user,
            created_at__date__range = (start, end)
        ).order_by('-created_at')
        callist = {}

        for diary in diaries:
            newdate = diary.created_at.date().isoformat()
            callist.setdefault(newdate, {
                        "id": diary.id,
                        "content": diary.content,
                        "created_at": diary.created_at
                    }
                )

        return Response(callist)
    #리스트
    @action(methods=['get'], detail=False, url_path='list')
    def diarylist(self, request):
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        year = int(year)
        month = int(month)
        start = date(year, month, 1)
        last_day = calendar.monthrange(year, month)[1]
        end = date(year, month, last_day)

        diaries = Diary.objects.filter(
            username=request.user,
            created_at__date__range=(start, end)
        ).order_by('-created_at')

        serializer = DiarySerializer(diaries, many=True)
        return Response(serializer.data)
    
    #일기 상세보기(detail)

    def list(self, request, *args, **kwargs):
        strdate = request.query_params.get('date')
        if not strdate:
            return super().list(request, *args, **kwargs)

        date_obj = datetime.strptime(strdate, "%Y-%m-%d").date()
        today = datetime.now().date()

        if date_obj < today:
            night_diary = NightDiary.objects.filter(user=request.user, date=date_obj).first()

            if not night_diary:
                # 자동 생성
                serializer = NightDiarySerializer(data={"date": date_obj}, context={'request': request})
                serializer.is_valid(raise_exception=True)
                night_diary = serializer.save()

            serializer = NightDiarySerializer(night_diary)
            return Response(serializer.data)

        # 오늘 날짜일 경우
        diaries = Diary.objects.filter(
            username=request.user,
            created_at__date=date_obj
        ).order_by('-created_at')
        serializer = DiarySerializer(diaries, many=True)
        return Response({"entries": serializer.data})
