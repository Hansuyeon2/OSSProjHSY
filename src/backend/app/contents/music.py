import requests
import random
from app.contents.music_tocken import SpotifyTokenManager

sub_emotion_to_genres = {
    # 행복 (단방향)
    "기쁨": {"maintain": ["pop", "dance", "happy"]},
    "감사하는": {"maintain": ["gospel", "soul", "r-n-b"]},
    "신뢰하는": {"maintain": ["folk", "soul", "pop"]},
    "만족스러운": {"maintain": ["pop", "chill", "happy"]},
    "흥분": {"maintain": ["edm", "party", "dance"]},
    "신이 난": {"maintain": ["edm", "dance", "party"]},
    "자신하는": {"maintain": ["hip-hop", "trap", "pop"]},

    # 평온 (단방향)
    "편안한": {"maintain": ["acoustic", "chill", "ambient"]},
    "느긋": {"maintain": ["ambient", "study", "sleep"]},
    "안도": {"maintain": ["chill", "ambient", "folk"]},

    # 놀람 (단방향)
    "당황": {"maintain": ["electronic", "edm", "indie-pop"]},
    "충격 받은": {"maintain": ["electronic", "trip-hop", "alternative"]},

    # 우울 (양방향)
    "고립된": {
        "maintain": ["sad", "acoustic", "blues"],
        "overcome": ["pop", "happy", "dance"]
    },
    "열등감": {
        "maintain": ["sad", "blues", "indie"],
        "overcome": ["pop", "dance", "happy"]
    },
    "부끄러운": {
        "maintain": ["indie", "folk", "acoustic"],
        "overcome": ["pop", "dance", "happy"]
    },
    "가난한 불우한": {
        "maintain": ["blues", "folk", "acoustic"],
        "overcome": ["pop", "dance", "happy"]
    },
    "슬픔": {
        "maintain": ["sad", "piano", "acoustic"],
        "overcome": ["pop", "dance", "happy"]
    },
    "실망한": {
        "maintain": ["sad", "acoustic", "ballad"],
        "overcome": ["pop", "dance", "happy"]
    },
    "비통한": {
        "maintain": ["sad", "blues", "soul"],
        "overcome": ["pop", "dance", "happy"]
    },
    "후회되는": {
        "maintain": ["blues", "sad", "folk"],
        "overcome": ["pop", "dance", "happy"]
    },
    "우울한": {
        "maintain": ["sad", "acoustic", "piano"],
        "overcome": ["pop", "dance", "happy"]
    },
    "마비된": {
        "maintain": ["ambient", "minimal-techno", "dark-ambient"],
        "overcome": ["pop", "dance", "happy"]
    },
    "염세적인": {
        "maintain": ["indie", "alternative", "emo"],
        "overcome": ["pop", "dance", "happy"]
    },
    "눈물이 나는": {
        "maintain": ["sad", "acoustic", "piano"],
        "overcome": ["pop", "dance", "happy"]
    },
    "낙담한": {
        "maintain": ["sad", "folk", "blues"],
        "overcome": ["pop", "dance", "happy"]
    },
    "환멸을 느끼는": {
        "maintain": ["grunge", "punk", "alternative"],
        "overcome": ["pop", "dance", "happy"]
    },
    "외로운": {
        "maintain": ["indie", "folk", "acoustic"],
        "overcome": ["pop", "dance", "happy"]
    },
    "죄책감의": {
        "maintain": ["blues", "sad", "soul"],
        "overcome": ["pop", "dance", "happy"]
    },
    "상처": {
        "maintain": ["emo", "punk", "sad"],
        "overcome": ["pop", "dance", "happy"]
    },

    # 화남 (양방향)
    "분노": {
        "maintain": ["metal", "hardcore", "rock"],
        "overcome": ["hip-hop", "funk", "dance"]
    },
    "툴툴대는": {
        "maintain": ["punk", "grunge", "rock"],
        "overcome": ["hip-hop", "funk", "dance"]
    },
    "좌절한": {
        "maintain": ["emo", "punk", "rock"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "짜증내는": {
        "maintain": ["punk", "hard-rock", "garage"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "방어적인": {
        "maintain": ["metal", "hardcore", "rock"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "악의적인": {
        "maintain": ["black-metal", "death-metal", "hardcore"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "안달하는": {
        "maintain": ["garage", "punk", "rock"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "구역질 나는": {
        "maintain": ["metal", "hardcore", "grindcore"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "노여워하는": {
        "maintain": ["metal", "hardcore", "rock"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "성가신": {
        "maintain": ["punk", "garage", "grunge"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "질투하는": {
        "maintain": ["hip-hop", "trap", "r-n-b"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "배신당한": {
        "maintain": ["emo", "punk-rock", "alternative"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "억울한": {
        "maintain": ["punk", "rock", "emo"],
        "overcome": ["hip-hop", "dance", "funk"]
    },
    "괴로워하는": {
        "maintain": ["sad", "emo", "blues"],
        "overcome": ["pop", "dance", "happy"]
    },

    # 두려움 (양방향)
    "불안": {
        "maintain": ["ambient", "minimal-techno", "trip-hop"],
        "overcome": ["pop", "dance", "happy"]
    },
    "두려운": {
        "maintain": ["ambient", "trip-hop", "chill"],
        "overcome": ["pop", "dance", "happy"]
    },
    "스트레스 받는": {
        "maintain": ["deep-house", "chill", "house"],
        "overcome": ["pop", "dance", "happy"]
    },
    "취약한": {
        "maintain": ["acoustic", "sad", "folk"],
        "overcome": ["pop", "dance", "happy"]
    },
    "혼란스러운": {
        "maintain": ["trip-hop", "electronic", "minimal-techno"],
        "overcome": ["pop", "dance", "happy"]
    },
    "당혹스러운": {
        "maintain": ["trip-hop", "minimal-techno", "ambient"],
        "overcome": ["pop", "dance", "happy"]
    },
    "회의적인": {
        "maintain": ["indie", "grunge", "alternative"],
        "overcome": ["pop", "dance", "happy"]
    },
    "걱정스러운": {
        "maintain": ["ambient", "study", "chill"],
        "overcome": ["pop", "dance", "happy"]
    },
    "조심스러운": {
        "maintain": ["ambient", "acoustic", "folk"],
        "overcome": ["pop", "dance", "happy"]
    },
    "초조한": {
        "maintain": ["minimal-techno", "trip-hop", "ambient"],
        "overcome": ["pop", "dance", "happy"]
    },
    "희생된": {
        "maintain": ["sad", "acoustic", "blues"],
        "overcome": ["pop", "dance", "happy"]
    },
    "버려진": {
        "maintain": ["sad", "acoustic", "folk"],
        "overcome": ["pop", "dance", "happy"]
    },
    "남의 시선을 의식하는": {
        "maintain": ["indie", "folk", "alternative"],
        "overcome": ["pop", "dance", "happy"]
    },
}

token_manager = SpotifyTokenManager()

SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search"

def get_spotify_tracks(seed_genres, sample_size=1):

    access_token = token_manager.get_access_token()

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    candidates = []

    for genre in seed_genres:
        params = {
            "q": f"genre:{genre}",
            "type": "track",
            "limit": 10 
        }
        response = requests.get(SPOTIFY_SEARCH_URL, headers=headers, params=params)
        if response.status_code == 200:
            results = response.json()
            for item in results['tracks']['items']:
                candidates.append({
                    "title": item['name'],
                    "sub": item['artists'][0]['name'],
                    "url": item['external_urls']['spotify']
                })
        else:
            print(f"Spotify API 호출 실패: {response.status_code} {response.text}")

    if len(candidates) >= sample_size:
        return random.sample(candidates, sample_size)
    else:
        return candidates 

def recommend_music(matched_sub_emotions, recommend_type="maintain"):
    all_candidates = []

    for sub_emotion in matched_sub_emotions:
        genre_info = sub_emotion_to_genres.get(sub_emotion, {})
        seed_genres = genre_info.get(recommend_type, ["pop"])

        for genre in seed_genres:
            tracks = get_spotify_tracks([genre], sample_size=10)
            all_candidates.extend(tracks)

    unique_candidates = {
        (track['title'], track['sub']): track for track in all_candidates
    }
    final_recommendations = random.sample(
        list(unique_candidates.values()),
        min(len(unique_candidates), 10)
    )

    return final_recommendations
