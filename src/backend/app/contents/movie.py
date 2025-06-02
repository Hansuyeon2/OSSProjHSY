import random
from app.models import Movie
from app.contents.book import overcome_emotion_map 

def recommend_movies(sub_emotions: list, recommend_type: str = "maintain"):
    matched_movies = []

    for movie in Movie.objects.all():
        if not isinstance(movie.sub_emotions, list):
            continue

        if recommend_type == "maintain":
            if any(sub in movie.sub_emotions for sub in sub_emotions):
                matched_movies.append(movie)
        elif recommend_type == "overcome":
            alt_emotions = []
            for sub in sub_emotions:
                alt_emotions.extend(overcome_emotion_map.get(sub, []))
            if any(emotion in movie.sub_emotions for emotion in alt_emotions):
                matched_movies.append(movie)

    if not matched_movies:
        return []

    sampled_movies = random.sample(matched_movies, min(10, len(matched_movies)))

    return [
        {
            "title": movie.title,
            "director": movie.director,
            "main_emotion": movie.main_emotion,
            "sub_emotions": movie.sub_emotions
        }
        for movie in sampled_movies
    ]
