from django.contrib import admin
from .models import Diary

@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    fields = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    search_fields = ('content',)
    list_filter = ('main_emotion', 'created_at')
