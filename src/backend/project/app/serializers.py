from rest_framework import serializers
from .models import *

class DiarySerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Diary
        fields = ['id', 'content', 'username', 'created_at']
        read_only_fields = ['id', 'username', 'created_at']