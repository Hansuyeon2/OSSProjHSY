import requests
import base64
import time

# Spotify 앱 등록할 때 받은 Client ID와 Client Secret
CLIENT_ID = "c41a726220e24d5889af120c985c01cb"
CLIENT_SECRET = "3d4b577cb937491abf0961390ec7601c"

class SpotifyTokenManager:
    def __init__(self):
        self.access_token = None
        self.token_expires_at = 0  # 유효기간 (timestamp)

    def _get_new_token(self):
        """
        Spotify 서버로부터 새 Access Token 요청
        """
        auth_str = f"{CLIENT_ID}:{CLIENT_SECRET}"
        b64_auth_str = base64.b64encode(auth_str.encode()).decode()

        headers = {
            "Authorization": f"Basic {b64_auth_str}",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        data = {
            "grant_type": "client_credentials"
        }

        response = requests.post("https://accounts.spotify.com/api/token", headers=headers, data=data)

        if response.status_code == 200:
            result = response.json()
            self.access_token = result['access_token']
            self.token_expires_at = time.time() + result['expires_in']  # 보통 3600초 (1시간)
        else:
            raise Exception(f"Spotify Token 발급 실패: {response.status_code} {response.text}")

    def get_access_token(self):
        """
        항상 유효한 토큰을 반환하는 함수
        """
        if self.access_token is None or time.time() >= self.token_expires_at:
            self._get_new_token()
        return self.access_token
