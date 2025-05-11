from ai.sentiment_analysis  import sentiment
from rest_framework import serializers
from .models import *

class DiarySerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Diary
        fields = ['id', 'content', 'username', 'created_at', 'main_emotion','sub_emotion']
        read_only_fields = ['id', 'username', 'created_at', 'main_emotion','sub_emotion']

    def create(self, validated_data):
        content = validated_data.get('content')
        analysis_result = sentiment(content)

        if analysis_result['status'] == 'success':
            validated_data['main_emotion'] = analysis_result['main_emotion']
            validated_data['sub_emotion'] = analysis_result['sub_emotion']
        else:
            validated_data['main_emotion'] = None
            validated_data['sub_emotion'] = None

        return super().create(validated_data)