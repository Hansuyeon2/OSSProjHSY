from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from app.views import DiaryViewSet

router = DefaultRouter()
router.register("diary", DiaryViewSet, basename='diary')


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include(router.urls)),
    path('auth/', include('accounts.urls')),
]
