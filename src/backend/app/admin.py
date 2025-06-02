from django.contrib import admin
from .models import Diary,Book

@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    fields = ('content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 
    'analysis')
    search_fields = ('content',)
    list_filter = ('main_emotion', 'created_at')

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'auth', 'main_emotion', 'sub_emotion')
    fields = ('title', 'auth', 'main_emotion', 'sub_emotion')
    search_fields = ('title',)

