from ai.sentiment_analysis import sentiment, find_main_emotion
from ai.sentiment_cause.inference.inference import generate_cause_from_text
from ai.comment import gpt_comment  
from rest_framework import serializers
from .models import Diary, NightDiary
from app.contents.music import recommend_music
from app.contents.book  import recommend_books
from app.contents.movie  import recommend_movies
from app.contents.exhibition import recommend_exhibitions
from collections import Counter


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
            validated_data['sub_emotion'] = []

        matched_sub_emotions = [
            sub for sub in validated_data.get('sub_emotion', [])
            if find_main_emotion(sub) == validated_data['main_emotion']
        ]

        maintain_music = recommend_music(matched_sub_emotions, recommend_type="maintain")
        maintain_books = recommend_books(matched_sub_emotions, recommend_type="maintain")
        maintain_movies = recommend_movies(matched_sub_emotions, recommend_type="maintain")
        maintain_exhibitions = recommend_exhibitions(validated_data['main_emotion'], recommend_type="maintain")

        if validated_data['main_emotion'] in ["행복", "평온", "놀람"]:
            validated_data['analysis'] = {
                "set_1": {
                    "title": f"{validated_data['main_emotion']} 감정을 오래 간직할 수 있는",
                    "movies": maintain_movies,
                    "books": maintain_books,
                    "music": maintain_music,
                    "exhibitions": maintain_exhibitions,
                }
            }
        elif validated_data['main_emotion'] == "기타":
            validated_data['analysis'] = {
                "set_1": {
                    "title": "기분 전환을 위한 랜덤 추천",
                    "movies": recommend_movies(matched_sub_emotions, recommend_type="maintain"),
                    "books": recommend_books(matched_sub_emotions, recommend_type="maintain"),
                    "music": recommend_music(matched_sub_emotions, recommend_type="maintain"),
                    "exhibitions": recommend_exhibitions("기타", recommend_type="maintain")
                }
            }
        else:
            overcome_movies = recommend_movies(matched_sub_emotions, recommend_type="overcome")
            overcome_music = recommend_music(matched_sub_emotions, recommend_type="overcome")
            overcome_books = recommend_books(matched_sub_emotions, recommend_type="overcome")
            overcome_exhibitions = recommend_exhibitions(validated_data['main_emotion'], recommend_type="overcome")
            validated_data['analysis'] = {
                "set_1": {
                    "title": f"{validated_data['main_emotion']} 감정을 내려놓을 수 있는",
                    "movies": maintain_movies,
                    "books": maintain_books,
                    "music": maintain_music,
                    "exhibitions": maintain_exhibitions,
                },
                "set_2": {
                    "title": f"{validated_data['main_emotion']} 감정을 다독여줄",
                    "movies": overcome_movies,
                    "books": overcome_books,
                    "music": overcome_music,
                    "exhibitions": overcome_exhibitions,
                }
            }

        return super().create(validated_data)


class NightDiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ['id', 'content', 'username', 'created_at', 'main_emotion', 'sub_emotion']


class NightDiarySerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    entries = serializers.SerializerMethodField()

    main_emotion = serializers.CharField(required=False)
    sub_emotion = serializers.JSONField(required=False)
    analysis = serializers.JSONField(required=False)

    class Meta:
        model = NightDiary
        fields = ['date', 'username', 'entries', 'main_emotion', 'sub_emotion', 'analysis']

    def get_entries(self, obj):
        diaries = Diary.objects.filter(username=obj.user, created_at__date=obj.date)
        return NightDiaryEntrySerializer(diaries, many=True).data

    def to_representation(self, instance):
        day = super().to_representation(instance)
        return {
            "entries": day.pop("entries"),
            "emotion": {
                "main_emotion": day["main_emotion"],
                "sub_emotion": day["sub_emotion"],
                "comment": instance.comment
            },
            "analysis": day.pop("analysis")
        }

    def create(self, validated_data):
        user = self.context['request'].user
        date = validated_data['date']

        diaries = Diary.objects.filter(username=user, created_at__date=date)
        main_list = [d.main_emotion for d in diaries if d.main_emotion]

        if not main_list:
            raise serializers.ValidationError("해당 날짜에 감정이 분석된 일기가 없습니다.")

        top_main = Counter(main_list).most_common(1)[0][0]

        sub_list = []
        for d in diaries:
            if isinstance(d.sub_emotion, list):
                if top_main == "기타":
                    sub_list += d.sub_emotion
                else:
                    sub_list += [s for s in d.sub_emotion if find_main_emotion(s) == top_main]


        sub_counter = Counter(sub_list)
        sorted_subs = dict(sorted(sub_counter.items(), key=lambda x: x[1], reverse=True))
        matched_sub_list = list(sorted_subs.keys())

        maintain_movies = recommend_movies(matched_sub_list, recommend_type="maintain")
        maintain_music = recommend_music(matched_sub_list, recommend_type="maintain")
        maintain_books = recommend_books(matched_sub_list, recommend_type="maintain")
        maintain_exhibitions = recommend_exhibitions(top_main, recommend_type="maintain")
        if top_main in ["행복", "평온", "놀람"]:
            analysis = {
                "set_1": {
                    "title": f"{top_main} 감정을 오래 간직할 수 있는",
                    "music": maintain_music,
                    "books": maintain_books,
                    "movies": maintain_movies,
                    "exhibitions": maintain_exhibitions
                }
            }
        elif top_main == "기타":
            analysis = {
                "set_1": {
                    "title": "랜덤 추천",
                    "movies": recommend_movies(matched_sub_list,recommend_type="maintain"),
                    "books": recommend_books(matched_sub_list, recommend_type="maintain"),
                    "music": recommend_music(matched_sub_list, recommend_type="maintain"),
                    "exhibitions": recommend_exhibitions("기타", recommend_type="maintain")
                }
            }   
        else:
            overcome_music = recommend_music(matched_sub_list, recommend_type="overcome")
            overcome_books = recommend_books(matched_sub_list, recommend_type="overcome")
            overcome_movies = recommend_movies(matched_sub_list, recommend_type="maintain")
            overcome_exhibitions = recommend_exhibitions(top_main, recommend_type="overcome")
            analysis = {
                "set_1": {
                    "title": f"{top_main} 감정을 내려놓을 수 있는",
                    "music": maintain_music,
                    "books": maintain_books,
                    "movies": maintain_movies,
                    "exhibitions": maintain_exhibitions
                },
                "set_2": {
                    "title": f"{top_main} 감정을 다독여줄",
                    "music": overcome_music,
                    "books": overcome_books,
                    "movies": overcome_movies,
                    "exhibitions": overcome_exhibitions
                }
            }
            
        all_causes = []
        for d in diaries:
            all_causes.extend(generate_cause_from_text(d.content))

        comment = gpt_comment(all_causes, top_main)

        validated_data["user"] = user
        validated_data["main_emotion"] = top_main
        validated_data["sub_emotion"] = sorted_subs
        validated_data["analysis"] = analysis
        validated_data["comment"] = comment

        return super().create(validated_data)

class ReportSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    month = serializers.IntegerField()