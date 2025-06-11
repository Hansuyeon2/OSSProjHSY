# 일기 기반 감정 흐름 시각화 및 감정 기반 콘텐츠 큐레이션 서비스 : 쿼디
### 25-1 오픈소스소프트웨어프로젝트 라이옹팀

<br>


## 🦁 팀원 소개

<table>
  <tr>
    <td align="center"><img src="https://github.com/user-attachments/assets/d1d20f2d-4a3d-4269-9831-1dfc0c956b33" width="150" /></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/d18e1869-e432-4193-a5bf-247538cdd76a" width="150" /></td>
    <td align="center"><img src="https://github.com/user-attachments/assets/3fb2d1e4-b2c0-4338-aecd-cd47fd6efddd" width="150" /></td>
  </tr>
  <tr>
    <td align="center">오찬주</td>
    <td align="center">한수연</td>
    <td align="center">황민영</td>
  </tr>
  <tr>
    <td align="center">팀장, 프론트엔드, AI 감정 데이터셋 전처리</td>
    <td align="center">백엔드, AI 감정 분석 기능 구현</td>
    <td align="center">UIUX 디자인, AI 감정 원인 추출 기능 구현</td>
  </tr>
</table>

<br>


## 📅 개발 기간

2025.03.02 ~ 2025.06.11

<br>

 
## 💻 프로젝트 소개
본 서비스는 사용자가 하루에 짧게 여러 번 기록할 수 있는 메모형 일기 작성, 그리고 감정 분석을 통한 바이오리듬 시각화 및 개인 맞춤형 조언 제공을 통해, 감정을 자연스럽게 돌아보고 더 나은 일상으로 이끌 수 있도록 돕는다.
<br>
<br>
[<img src="https://github.com/user-attachments/assets/f38d898b-027a-4f05-93c0-ff946a5a4947" alt="아이콘" width="20" /> 쿼디 서비스 바로가기](https://liong.netlify.app/)

<br>


## 💼 프로젝트 관리 문서

### 회의록

[📑 회의록 링크](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/3_3_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%ED%9A%8C%EC%9D%98%EB%A1%9D.pdf)

### 시연 영상

[🔗 전체 서비스 시연 영상](https://youtu.be/7Z1hxcDPluE)

### 제품의 구성, 배포 및 운영 관련 문서 자료
[📋 제품의 구성, 배포 및 운영 관련 문서 자료](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/3_4_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%A0%9C%ED%92%88%EA%B5%AC%EC%84%B1%EB%B0%B0%ED%8F%AC%EC%9A%B4%EC%98%81%EC%9E%90%EB%A3%8C.pdf)

<br>


## ⏳ 개발 동기 및 목적

일기는 감정 표현과 자기 성찰의 수단이지만, 많은 사용자가 단순 기록에 그치고 있다. 본 프로젝트는 일기 텍스트를 분석해 감정의 흐름과 원인을 파악함으로써, 보다 생산적인 자기 돌봄을 가능하게 하고자 설계하였다.

기존 일기 앱은 감정 선택이나 간단한 기록에 초점을 두고 있으며, 자동 감정 분석, 원인 추론, 시각화, 맞춤형 피드백 기능은 미흡하다. 특히 20대의 정신건강 문제 경험률은 높지만 상담 접근은 낮아, 일상 속 비대면 정서 관리 도구의 필요성이 제기된다.

이에 따라 본 서비스는 짧은 메모형 일기 작성, 감정 분석 기반 바이오리듬 시각화, 맞춤형 조언 제공을 통해 감정의 흐름을 이해하고 행동 변화를 유도하고자 한다. 궁극적으로 감정 인식과 회복력을 높이는 지속 가능한 정서 관리 도구로 자리매김하고자 한다.
 
<br>

## 🧶 개발 목표 및 범위

### (1) 작성한 일기 기반 콘텐츠 추천

(1) 사용자의 일기 작성
- 사용자는 하루 동안 여러 번 일기를 자유롭게 기록할 수 있으며, 작성 시 자동으로 시간 정보가 함께 저장된다.
- 작성된 일기는 서버에 저장되며, 마이페이지 또는 감정 분석 페이지에서 슬라이드 형태로 시간순 정렬된 목록으로 확인할 수 있다.
- 이 일기들은 감정 분석의 기초 데이터로 활용된다.

(2) 콘텐츠 추천
- 사용자의 일기 내용을 분석해 대표 감정을 추출하고, 그 감정에 적합한 콘텐츠를 추천한다. 
- 감정 유형에 따라 다음과 같이 분기된다.
  - 긍정적 감정 (예: 행복, 놀람, 평온, 기타): 감정을 유지하거나 확장할 수 있는 콘텐츠(예: 여행 영상, 힐링 음악 등)를 추천
  - 부정적 감정 (예: 우울, 화남, 불안 등): 감정 유지형: 감정을 공감하고 위로할 수 있는 콘텐츠 / 감정 전환형: 기분을 전환하는 데 도움이 되는 콘텐츠
- 추천 콘텐츠는 영화, 음악, 영상, 책 등 다양한 장르로 구성되며, 사용자 데이터가 축적될수록 추천이 정교화된다.
    

### (2) 일일 감정 분석 

(1) 하루 바이오리듬 분석
- 하루 동안 작성된 일기의 감정 분석 결과를 시간대별 선 그래프로 시각화하여 감정 흐름을 확인할 수 있다.
- X축은 시간, Y축은 감정 또는 강도이며, 하루 동안의 감정 패턴을 한눈에 보여준다.

(2) 감정 원인 분석 및 조언 제공
- T5 기반 감정 원인 추출 모델을 사용하여 감정의 주요 원인을 도출한다.
- 하루 전체 일기를 종합 분석하여 정서적 위로와 행동 조언을 제공한다.
- 예: “회의 후 기분이 자주 가라앉네요. 회의 직후 짧은 산책을 시도해보는 건 어떨까요?”

(3) 감정 세부 분석
- 대표 감정과 함께 자주 등장한 세부 감정들을 도넛 그래프 형태로 시각화하여 감정 비율을 보여준다.
- 예: 행복 50%, 놀람 30%, 피로 20%

(4) 콘텐츠 추천
- 하루의 감정 상태에 어울리는 콘텐츠를 종합 추천한다.
- 감정의 비율과 주요 감정의 성격에 따라 콘텐츠가 맞춤형으로 제공된다.


### (3) 월간리포트

(1) 해당 달의 감정 분포
- 한 달간 작성된 일기의 대표 감정을 카운팅하여 도넛 그래프로 시각화한다.
- 감정별 일 수를 표시하여, 어떤 감정이 자주 등장했는지 확인할 수 있다.

(2) 해당 달의 감정 키워드
- 한 달간 자주 등장한 세부 감정 단어들을 워드 클라우드 형태로 시각화한다.
- 상위 6개의 감정을 강조하여 사용자 감정 경향을 보여준다.

(3) 해당 달의 감정 그래프
- 월간 데이터를 1주차 ~ 5주차로 나누어 대표 감정의 주차별 변화 그래프를 제공한다.
- 감정 기록이 없는 주차는 자동 생략된다.

<br />

## ✨ 감정 분석 알고리즘
 (1) 입력 문장 분할<br>
사용자가 작성한 감정일기는 한 문장으로만 구성되지 않으며, 여러 감정이 혼합될 수 있기 때문에, 먼저 전체 텍스트를 문장 단위로 분할한다. 이를 위해 정규표현식을 활용하여 마침표(.), 느낌표(!), 물음표(?) 등을 기준으로 문장을 나누고, 각 문장을 개별적으로 분석 대상으로 처리한다. 

 (2) 감정 예측 및 상세 감정 추출<br>
분할된 각 문장에 대해 Hugging Face의 pipeline("text-classification")기능을 사용해 감정 예측을 수행한다. 모델은 다중 감정 분류 결과를 확률(score)과 함께 반환하며, 각 문장에서는 가장 높은 확률을 가진 감정을 해당 문장의 대표 감정으로 선택한다.

 (3) 주요 감정군 매핑<br>
예측된 상세 감정(예: ‘신이 난’, ‘괴로워하는’ 등)을 바탕으로 7가지 감정(행복, 평온, 놀람, 우울, 화남, 두려움, 기타)중 하나로 매핑한다. 이를 위해 사전에 정의된 emotion_mapping 딕셔너리를 활용하여, 세부 감정을 대표 감정군으로 변환한다. 사전에 정의되지 않은 감정이나 정확도가 낮은 감정은 ‘기타’로 처리한다.

 (4) 주요 감정 결정 로직<br>
문장별 분석이 끝난 후, 전체 문장에서 가장 자주 등장한 주요 감정을 최종 감정으로 선택한다. 이때 최빈값을 기준으로 결정하며, 동일한 빈도로 여러 감정이 등장하는 경우에는 가장 마지막 문장의 감정을 최종 감정으로 선택한다.

 (5) 출력<br>
최종적으로 전체 일기에서 감정 분석 결과는 main_emotion 항목으로 반환되며, 추후 감정 원인 추론, 감정 기록 시각화 등 다양한 기능과 연계된다.

<br>

## ✨ 감정 원인 추출 알고리즘
### 모델 학습 과정

(1) 데이터셋 로드 및 전처리 준비<br>
 감정 원인 추출 학습을 위해 구축한 sentiment_cause.csv파일을 불러와 Hugging Face의 datasets라이브러리를 활용해 데이터셋으로 변환한다. 해당 CSV는 감정이 드러난 일상 문장(input_text)과 그에 대한 감정의 원인 문장(target_text)으로 구성되어 있다. 입력 텍스트는 최대 길이 128 토큰으로, 출력 라벨은 최대 64 토큰으로 제한하며, label_pad_token_id=-100을 적용해 패딩 토큰이 손실 함수 계산에 반영되지 않도록 처리한다. 이는 모델이 의미 있는 부분만 학습하도록 돕기 위함이다.

(2) T5 모델 및 토크나이저 로드<br>
 한국어 T5 기반 모델인 KETI-AIR/ke-t5-base를 불러와 감정 원인 추출 모델의 초기 가중치로 사용한다. 이 모델은 한글 문장에 대한 자연어 처리 성능이 검증된 모델로, 감정일기 형태의 문장을 이해하고 원인을 생성하는 데 적합하다. 입력과 출력 모두 자연어 기반이므로, T5Tokenizer를 사용해 문장을 토큰화하고 target_tokenizer설정을 통해 출력 라벨도 별도로 인코딩한다.

(3) 학습 데이터 전처리 및 Tokenizing<br>
 감정일기 문장을 입력으로, 감정 원인을 목표값으로 설정하여 각각 토큰화한 뒤, padding과 truncation을 적용한다. 이때 라벨의 패딩 토큰은 -100으로 변환되어, T5 모델의 cross-entropy loss 계산에서 무시된다. 전처리된 결과는 datasets.Dataset.map()을 이용해 전체 데이터셋에 일괄 적용되며, 이후 학습에 사용할 수 있는 형태로 구성된다.

(4) Trainer 구성 및 학습 설정<br>
 Seq2SeqTrainer클래스를 사용해 학습을 진행하며 다음과 같은 설정으로 이루어진다.
- 배치 크기 8
- 학습률 3e-4
- 10 에폭 동안 학습
- warm-up 단계와 weight decay 적용
- 생성 기반 평가(predict_with_generate=True)
- GPU memory 최적화를 위한 padding 정렬(pad_to_multiple_of=8)

로그는 일정 간격(logging_steps=100)마다 기록되며, 불필요한 외부 로깅은 비활성화(report_to="none")된다.

<img width="369" alt="스크린샷 2025-06-10 오후 3 22 47" src="https://github.com/user-attachments/assets/813a7ed2-f2d2-468a-a56e-6456d59481c8" />

최종 학습 loss는 0.15로 매우 높은 정확도 및 신뢰도를 보이고 있다.

(5) 모델 저장 및 학습 완료<br>
 학습이 완료된 모델은 지정된 경로(MODEL_DIR)에 저장되며, save_model()과 save_pretrained()메서드를 통해 모델 가중치와 tokenizer가 함께 저장된다.
이는 이후 추론 파이프라인에서 직접 불러와 사용할 수 있도록 구성된 단계로, 감정일기 텍스트로부터 원인을 생성하는 모델의 기반이 된다.


### 감정 원인 추출

(1) 입력 문장 분할<br>
감정일기에는 하나의 문장 안에 복합적인 상황이 포함되어 있거나, 복수의 감정이 혼합된 경우가 많다. 따라서 감정 분석과 동일하게 정규표현식을 활용해 마침표(.), 느낌표(!), 물음표(?) 등을 기준으로 문장을 분할하고, 각 문장을 감정 원인 추출의 단위로 사용한다.

(2) 모델 입력 텍스트 구성<br>
분할된 문장은 "문장에서 감정의 원인을 추출하세요: [문장]"형식의 프롬프트로 변환되며, 이는 T5 모델에 자연어 형태로 과제를 제시하여, 문맥에 맞는 원인을 생성하도록 유도하는 입력 구조이다.

(3) 데이터셋 구축 및 모델 파인튜닝<br>
AI Hub의 한국어 감성대화 말뭉치를 기반으로 감정일기 형식에 적합한 약 9,000개의 원인 추출 학습용 데이터셋을 구축하였다. 각 데이터는 사용자의 감정이 드러나는 일상적 문장(input_text)과 해당 감정의 직접적 원인(target_text)으로 구성되어 있으며, 이를 바탕으로 T5 모델을 파인튜닝하였다. 학습 시에는 감정 원인을 보다 자연스럽고 간결하게 생성할 수 있도록 라벨 텍스트 길이를 제한하고(max_length=32), 패딩 토큰을 무시하도록 label_pad_token_id=-100옵션을 적용하여 모델이 의미 있는 출력을 생성하도록 하였다. 

(4) 모델 및 토크나이저 로드<br>
위에서 학습시킨 모델을 Hugging Face Hub에 업로드하여 lazy-loading 방식으로 불러온다. 이때 @lru_cache()데코레이터를 활용해, 같은 세션 내에서는 모델과 토크나이저를 한 번만 로드하여 메모리 효율을 높인다. 모델은 GPU(CUDA) 또는 CPU 환경에 따라 자동으로 디바이스를 설정해 로드된다.

(5) T5 기반 감정 원인 생성<br>
각 입력 문장을 토크나이저로 인코딩한 후, model.generate()메서드를 통해 감정의 원인을 생성한다. 생성 과정에는 다음과 같은 설정이 적용된다.

- max_length=30: 너무 긴 원인을 방지
- num_beams=4: 빔 서치를 통한 더 자연스러운 출력 유도
- early_stopping=True: 필요 이상 반복 방지
  
모델의 출력 텍스트에는 종종 감정 라벨이 포함되거나 불필요한 특수기호가 있을 수 있기 때문에, 후처리를 통해 감정 정보를 제거하고 오로지 원인 텍스트만 추출한다.

(6) 감정 분석 결과와 통합 출력<br>
감정 분석 결과(예: 슬픔, 분노 등)와 원인 생성 결과를 통합하여, "당신은 [감정]을 느끼고 있으며, 이는 [원인] 때문일 수 있습니다."와 같은 피드백 메시지를 사용자에게 제공한다. 이 출력은 이후 위로·격려·조언 생성과도 연계되어, 사용자에게 정서적 공감과 심리적 안정감을 함께 제공할 수 있도록 구성된다.


<br>

## 🚀 주요 기능 요구사항 분석

| **화면**                   | **기능**                         | **요구사항**                                                                 | **추가 설명**                                                                                  |
|----------------------------|----------------------------------|------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| 회원가입 페이지            | 회원가입                         | 닉네임, 비밀번호, 비밀번호를 입력받아 유저를 생성한다.                         | 비밀번호, 비밀번호 확인이 맞지 않으면 회원가입 버튼이 비활성화된다.                          |
| 로그인 페이지              | 로그인                           | 닉네임, 비밀번호를 입력 받아 가입한 유저인지 확인한다.                         |                                                                                               |
| 홈 페이지                 | 연도, 달에 해당하는 감정, 작성 일기 확인 | 지금 연도, 달을 기본값으로 해당 일에 해당하는 감정과 일기(최신 일기)를 캐릭터 및 텍스트로 확인할 수 있다. | 모달로 연도, 달을 선택해 이동할 수 있다.                                                      |
| 일기 작성 페이지           | 일기 작성                         | 일기를 작성하면 저장하기 버튼이 활성화된다. 해당 버튼을 누르고 다음 페이지로 넘어갈 때까지 로딩창을 보여준다. |                                                                                               |
| 콘텐츠 추천 페이지         | 작성한 일기에 따른 콘텐츠 추천         | 지금까지 작성한 일기들을 슬라이드 형태로 보여준다. 해당 일기 각각에 해당하는 메인 감정을 보여주고, 그에 맞는 콘텐츠 추천을 진행한다. | 감정이 긍정적이거나 해석이 고정적인 경우에는 하나의 추천 방향으로 콘텐츠를 제공하고, 그게 아니라면 2개의 추천 방향으로 콘텐츠를 제공한다. |
| 작성한 일기 리스트 확인 페이지 | 지금까지 작성한 일기 확인              | 지금까지 작성한 일기들을 리스트 형태로 보여준다. 모달을 활용해 원하는 연도, 달로 이동할 수 있다. | 만약 해당 달에 작성한 일기가 없다면 엠티뷰를 보여준다.                                       |
| 일일 감정 분석 페이지       | 해당 일에 작성한 일기 확인             | 해당 일에 작성한 일기들을 모두 확인할 수 있다. 작성한 일기들을 종합적으로 분석한 페이지다. |                                                                                               |
|                            | 하루 바이오리듬                      | 해당 일에 작성한 일기들을 시간대별로 감정을 선 그래프로 확인할 수 있다.       | 툴팁을 활용해 해당 포인트를 클릭하면 해당 감정을 느낀 시간과 감정을 확인할 수 있다.            |
|                            | 감정 원인 분석 및 조언 제공            | 해당 일을 종합적으로 원인, 감정을 분석해 그 감정을 느낀 원인을 설명하고 이를 감정적으로 위로하며 앞으로 사용자의 행동을 조언해준다. |                                                                                               |
|                            | 감정 세부 분석                      | 가장 많이 느낀 감정과 그에 따른 세부 감정들을 도넛 그래프 형태로 보여준다.     |                                                                                               |
|                            | 콘텐츠 추천                         | 해당 일에 어울리는 콘텐츠를 추천해준다.                                        |                                                                                               |
| 월간 감정 분석 페이지       | 월 리포트 조회                       | 해당 연도에 작성한 월 리포트를 리스트 형태로 보여준다.                        | 작성하지 않은 달은 보여주지 않는다.                                                           |
|                            | 해당 달의 감정 분포 한 눈에 보기        | 하루 대표 감정으로 카운팅해 “감정-일 수”를 도넛 그래프 형태로 보여준다.       | 툴팁을 활용해 도넛 그래프를 클릭하면 “감정 캐릭터-감정-일수”를 확인할 수 있다.                 |
|                            | 해당 달의 감정 키워드                 | 해당 달에 느낀 세부 감정들을 워드클라우드 형태로 보여준다. 상위 6개를 노출한다. |                                                                                               |
|                            | 해당 달의 감정 그래프                 | 1주차, 2주차, 3주차, 4주차, 5주차로 나눠 대표 감정들을 카운팅해 보여준다.     | 만약 해당 주차에 해당하는 감정이 없다면 건너뛴다.                                               |

<br />

## 🔧 기술 스택

| 분야            | 사용 기술                                                                  |
|-----------------|-----------------------------------------------------------------------------|
| **Design**      | Figma                                                                       |
| **Frontend**    | React, TypeScript, Styled-Components, Jotai, Axios, Netlify                |
| **Backend**     | DjangoRestFramework (DRF), SQLite                                           |
| **Data Analysis** | Python                                                                    |
| **Server**      | AWS EC2, Nginx, Gunicorn                                                    |


<br>

## 💼 시스템 구성도 및 다이어그램

| 감정 분석 및 맞춤형 콘텐츠 조언 제공 시스템 구성도 | 유스케이스 다이어그램 |
|------------------------------------------------------|------------------------|
| <img width="400" src="https://github.com/user-attachments/assets/b7df1f21-3c17-426e-95ba-dd7cddb74bc9" /> | <img width="400" src="https://github.com/user-attachments/assets/40b46bcc-b542-4789-8b61-39e5ab0b8df3" /> |

| 전체 시스템 블록 다이어그램 | 메인페이지 시퀀스 다이어그램 |
|----------------------------|------------------------------|
| <img width="400" src="https://github.com/user-attachments/assets/f33fec20-bd28-4605-9b95-6de6e754e4cf" /> | <img width="400" src="https://github.com/user-attachments/assets/47b7c172-8572-4cae-a703-8df793336925" /> |

| 일일 감정분석 페이지 시퀀스 다이어그램 | 플로우 차트 |
|---------------------------------------|-------------|
| <img width="400" src="https://github.com/user-attachments/assets/026a4229-300c-45fe-9c3a-7ec9ecec263d" /> | <img width="400" src="https://github.com/user-attachments/assets/33542695-8154-417b-8087-5e1c633066d8" /> |

| 데이터베이스 모듈 | ERD |
|------------------|-----|
| <img width="400" src="https://github.com/user-attachments/assets/34e6a4cd-398c-4e78-b2bd-21d61b8fea42" /> | <img width="400" src="https://github.com/user-attachments/assets/7ccb5c69-adc0-4f4a-ba1f-9f9649f82f39" /> |

| 시스템 아키텍처 |
|----------------|
| <img width="400" src="https://github.com/user-attachments/assets/3c2ca280-7faa-4eee-b022-4e8cdc9b4ad9" /> |
<br>

## 🗂️ 디렉터리 구성
```
📦src
┣ 📂backend
┃ ┣ 📂ai
┣ 📂frontend
```

<details>
  <summary><b>ai</b></summary>

  ```
📦ai
 ┣ 📂sentiment_cause
 ┃ ┣ 📂inference
 ┃ ┃ ┣ 📜inference.py
 ┃ ┣ 📂train
 ┃ ┃ ┣ 📜sentiment_cause.py
 ┃ ┃ ┣ 📜t5-model-train.csv
 ┃ ┣ 📜huggingface.py
 ┣ 📜comment.py
 ┣ 📜sentiment_analysis.py
```
</details>

<details>
  <summary><b>backend</b></summary>

  ```
📦 backend  
┣ 📂src  
┃ ┣ 📂backend  
┃ ┃ ┣ 📂accounts  
┃ ┃ ┃ ┣ 📂__pycache__  
┃ ┃ ┃ ┣ 📂migrations  
┃ ┃ ┃ ┣ 📜apps.py  
┃ ┃ ┃ ┣ 📜models.py  
┃ ┃ ┃ ┣ 📜serializers.py  
┃ ┃ ┃ ┣ 📜urls.py  
┃ ┃ ┃ ┗ 📜views.py  
┃ ┃ ┣ 📂ai  
┃ ┃ ┣ 📂app  
┃ ┃ ┃ ┣ 📂__pycache__  
┃ ┃ ┃ ┣ 📂contents  
┃ ┃ ┃ ┣ 📂migrations  
┃ ┃ ┃ ┣ 📜__init__.py  
┃ ┃ ┃ ┣ 📜admin.py  
┃ ┃ ┃ ┣ 📜apps.py  
┃ ┃ ┃ ┣ 📜models.py  
┃ ┃ ┃ ┣ 📜serializers.py  
┃ ┃ ┃ ┣ 📜tests.py  
┃ ┃ ┃ ┗ 📜views.py  
┃ ┃ ┣ 📂project  
┃ ┃ ┃ ┣ 📂__pycache__  
┃ ┃ ┃ ┣ 📜__init__.py  
┃ ┃ ┃ ┣ 📜asgi.py  
┃ ┃ ┃ ┣ 📜settings.py  
┃ ┃ ┃ ┣ 📜urls.py  
┃ ┃ ┃ ┗ 📜wsgi.py  
┣ 📂static  
┃ ┣ 📂admin  
┃ ┗ 📂rest_framework  
┣ 📜.python-version  
┣ 📜db.sqlite3  
┣ 📜manage.py  
┣ 📜Pipfile  
┣ 📜Pipfile.lock  
┣ 📜requirements.txt  
┣ 📂data_analysis  
┃ ┣ 📜book_analysis.csv  
┃ ┣ 📜book_analysis.py  
┃ ┣ 📜exhibition_analysis.csv  
┃ ┣ 📜exhibition_analysis.py  
┃ ┣ 📜movie_analysis.csv  
┃ ┗ 📜movie_analysis.py   
```
</details>

<details>
  <summary><b>frontend</b></summary>

  ```
📦 frontend  
┣ 📂public  
┃ ┣ 📂images  
┃ ┃ ┣ 📂character  
┃ ┃ ┣ 📂diary  
┃ ┃ ┣ 📂footer  
┃ ┃ ┣ 📂icons  
┃ ┃ ┣ 📂loading  
┃ ┃ ┣ 📂Login  
┃ ┃ ┗ 📂report  
┃ ┣ 📜_redirects  
┃ ┗ 📜vite.svg  
┣ 📂src  
┃ ┣ 📂apis          
┃ ┣ 📂atoms         
┃ ┣ 📂components     
┃ ┣ 📂layouts         
┃ ┣ 📂pages         
┃ ┣ 📂routes        
┃ ┣ 📂styles        
┃ ┣ 📂types         
┃ ┗ 📂utils           
┣ 📜App.css  
┣ 📜App.tsx  
┣ 📜index.css  
┗ 📜main.tsx
┗ 📜.gitignore  
┣ 📜eslint.config.js  
┣ 📜index.html  
┣ 📜package.json  
┣ 📜package-lock.json  
┣ 📜README.md  
┣ 📜tsconfig.json  
┣ 📜tsconfig.app.json  
┣ 📜tsconfig.node.json  
┣ 📜vite-env.d.ts  
┗ 📜vite.config.ts
```
</details>
<br>

## 👨‍🎓 기대효과
### 개인적 측면 – 정서 안정 및 자가 심리치유
• 감정 기록 → 분석 → 공감 기반 조언의 순환 구조를 통해 사용자가 자신의 감정을 자연스럽게 인식하고 돌볼 수 있는 환경을 제공
• 감정 바이오리듬 시각화, 맞춤형 조언 및 콘텐츠 추천을 통해 자가 감정 관리 루틴 형성
• MZ세대 등 디지털 친화적 세대에게 부담 없는 정서 관리 진입점을 제공하며, 자가 인지 및 조기 개입을 통한 회복탄력성 향상 기대  

### 사회적 측면 – 정신 건강 관리 접근성 확대  
• 고비용·고진입장벽의 전문 상담과 달리, AI 기반 비대면 정서 케어 서비스로 누구나 접근 가능한 심리관리 도구 제공
• 일기, 감정 시각화, 추천 콘텐츠 등 지속적 참여 유도 요소를 통해 일상 속 정서관리 습관화 유도

### 사회경제적 측면 – 예방 중심의 비용 절감  
• 초기 감정 문제를 사용자 스스로 인지하고 관리함으로써 정신질환의 예방 및 조기 대응 가능
• 의료비, 생산성 손실, 공공자원 소모 등 사회적 비용 절감 효과 기대

### 기술적 측면 – 감정 기반 AI 및 연관 산업 성장 기여
• 감정 분석 → 시각화 → 조언 제공까지의 흐름을 실제 서비스에 구현함으로써, AI 감정 인식 기술의 실용 사례 제시
• 디지털 헬스케어, 에듀테크, HR 등 다양한 분야로의 확장성과 응용 가능성 보유
• 사용자 맞춤형 감정 케어 시스템의 고도화 및 산업적 응용 촉진

<br>

## 📋 자료
- 회의록
  - [회의록](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/3_3_OSSProj_01_liong_%ED%9A%8C%EC%9D%98%EB%A1%9D.pdf)
- 이슈관리
  - [이슈 관리](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/issues?q=is%3Aissue%20state%3Aclosed)
  
| 라벨링 종류 | 이슈 OPEN VER. | 이슈 CLOSE VER. |
|-------------|------------------|------------------|
| <img width="300" src="https://github.com/user-attachments/assets/a89808fb-ef1d-494d-952b-db5ce0b33ca0" /> | <img width="300" src="https://github.com/user-attachments/assets/000cbd58-a85a-4f6e-b946-1130262dc92e" /> | <img width="300" src="https://github.com/user-attachments/assets/c4e5350b-d76e-4ad3-ab82-48e75e99ed0e" /> |

- API 명세서
  - [API 명세서](https://mignonieee.notion.site/API-1b4ef1aece7f805fa047fec17dd98f71?source=copy_link)
- 보고서
  - [수행계획서](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/1_1_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C.pdf)
  - [중간보고서](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/2_1_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf)
  - [최종보고서](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/3_1_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%B5%9C%EC%A2%85%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf)
- 발표자료
  - [제안 발표](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/1_2_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%A0%9C%EC%95%88%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf)
  - [중간 발표](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/2_2_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf)
  - [최종 발표](https://github.com/CSID-DGU/2025-1-OSSProj-liong-01/blob/main/doc/3_2_OSSProj_01_%EB%9D%BC%EC%9D%B4%EC%98%B9_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf)
