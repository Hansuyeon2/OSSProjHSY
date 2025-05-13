from ai.sentiment_analysis  import sentiment,find_main_emotion
from rest_framework import serializers
from .models import *
from app.contents.music_tocken import SpotifyTokenManager  # 토큰 자동 관리
from app.contents.music import sub_emotion_to_genres 
from app.contents.music import recommend_music
class DiarySerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Diary
        fields = ['id', 'content', 'username', 'created_at', 'main_emotion', 'sub_emotion', 'analysis']
        read_only_fields = ['id', 'username', 'created_at', 'main_emotion', 'sub_emotion']

    def create(self, validated_data):
        content = validated_data.get('content')
        analysis_result = sentiment(content)

        if analysis_result['status'] == 'success':
            validated_data['main_emotion'] = analysis_result['main_emotion']
            validated_data['sub_emotion'] = analysis_result['sub_emotion']
        else:
            validated_data['main_emotion'] = None
            validated_data['sub_emotion'] = None

        matched_sub_emotions = []
        for sub in validated_data.get('sub_emotion', []):
            main = find_main_emotion(sub)
            if main == validated_data['main_emotion']:
                matched_sub_emotions.append(sub)

        maintain_music = recommend_music(matched_sub_emotions, recommend_type="maintain")
    
    # 감정군에 따라 처리 분기
        if validated_data['main_emotion'] in ["행복", "평온", "놀람"]:
        # 행복/평온/놀람: set_1만 생성
            validated_data['analysis'] = {
                "set_1": {
                    "title": f"{validated_data['main_emotion']} 감정을 오래 간직할 수 있는",
                    "movies": [],
                    "books": [],
                    "music": maintain_music,
                    "exhibitions": []
                }
            }
        else:
        # 나머지 감정: set_1 + set_2 둘 다 생성
            overcome_music = recommend_music(matched_sub_emotions, recommend_type="overcome")

            validated_data['analysis'] = {
                "set_1": {
                    "title": f"{validated_data['main_emotion']} 감정을 내려놓을 수 있는",
                    "movies": [],
                    "books": [],
                    "music": maintain_music,
                    "exhibitions": []
                },
                "set_2": {
                    "title": f"{validated_data['main_emotion']} 감정을 다독여줄",
                    "movies": [],
                    "books": [],
                    "music": overcome_music,
                    "exhibitions": []
                }
            }

        return super().create(validated_data)