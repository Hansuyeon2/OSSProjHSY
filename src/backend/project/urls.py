from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from app.views import *

router = DefaultRouter()
router.register("diary", DiaryViewSet, basename='diary')


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include(router.urls)),
    path("report/", MonthlyReportView.as_view()),  
    path("report/<int:year>/<int:month>/", ReportView.as_view()), 
    path('auth/', include('accounts.urls')),
]
