import calendar
from datetime import date, datetime
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Diary
from .serializers import DiarySerializer

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
        if strdate:
            date = datetime.strptime(strdate, "%Y-%m-%d").date()

            diaries = Diary.objects.filter(
                username=request.user,
                created_at__date=date
            ).order_by('-created_at')

            serializer = self.get_serializer(diaries, many=True)
            return Response(serializer.data)
        
        return super().list(request, *args, **kwargs)

