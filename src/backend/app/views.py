from datetime import date, datetime, time
import calendar
import random

from django.utils import timezone
from django.utils.timezone import make_aware
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
