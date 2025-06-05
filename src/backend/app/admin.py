from django.contrib import admin
from .models import Diary,Book,NightDiary,Report

@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    fields = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    search_fields = ('content',)
    list_filter = ('main_emotion', 'created_at')

@admin.register(NightDiary)
class NightDiaryAdmin(admin.ModelAdmin):
    list_display = ('date', 'main_emotion', 'sub_emotion', 'comment')
    fields = ('date', 'main_emotion', 'sub_emotion', 'comment')


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'auth', 'main_emotion', 'sub_emotion')
    fields = ('title', 'auth', 'main_emotion', 'sub_emotion')
    search_fields = ('title',)

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ('user', 'year', 'month', 'main_emotion', 'sub_emotion','weekly_emotion','created_at')
    fields = ('user', 'year', 'month', 'main_emotion', 'sub_emotion','weekly_emotion','created_at')
    search_fields = ('month',)
