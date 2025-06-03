export const dummyDiaryAnalysisNight = {
  entries: [
    {
      id: 1,
      content: "내용",
      username: "username",
      created_at: "2025-04-02T12:00:00Z",
      main_emotion: "우울",
      sub_emotion: ["어쩌꾸", "저쩌구", "속상함"],
    },
    {
      id: 2,
      content: "내용",
      username: "username",
      created_at: "2025-04-02T19:00:00Z",
      main_emotion: "화남",
      sub_emotion: ["지침", "피곤함", "후회"],
    },
  ],
  analysis: {
    set_1: {
      title: "행복함을 더 오래 간직할 수 있는",
      movies: [
        {
          title: "미션 임파서블: 데드 레코닝",
          sub: "크리스토퍼 맥쿼리",
          url: "링크",
        },
      ],
      books: [
        {
          title: "달러구트 꿈 백화점",
          sub: "이미예",
          url: "링크",
        },
      ],
      music: [
        {
          title: "뉴진스 - ETA",
          sub: "뉴진스",
          url: "링크",
        },
      ],
      exhibitions: [
        {
          title: "반 고흐 인사이드",
          sub: "전시감독",
          url: "링크",
        },
      ],
    },
  },
  emotion: {
    main_emotion: "행복",
    comment:
      "어제 민영님이 가장 많이 느낀 감정은 ‘행복'이에요. 행복의 세부 감정으로는 ‘재밌음'을 가장 많이 느꼈고, 다음으로 ‘신남’을 많이 느낀 것으로 나타났어요.",
    sub_emotion: {
      기쁨: 4,
      신남: 3,
      즐거움: 2,
      쾌감: 1,
      보람: 1,
    },
  },
};
