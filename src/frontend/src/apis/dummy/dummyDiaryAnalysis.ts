import { DiaryAPIResponse } from "@apis/diary/getDiaryAnalysis";

export const dummyDiaryData: DiaryAPIResponse = {
  entries: [
    {
      id: 1,
      content: "오늘은 기분이 좀 울적했다.",
      username: "username1",
      created_at: "2025-05-02T09:00:00Z",
      main_emotion: "우울",
      analysis: {
        set_1: {
          title: "두려운 감정을 잠시 내려놓을 수 있는",
          movies: [
            { title: "비포 선셋", sub: "리처드 링클레이터" },
            { title: "비포 선셋", sub: "리처드 링클레이터" },
            { title: "비포 선셋", sub: "리처드 링클레이터" },
            { title: "비포 선셋", sub: "리처드 링클레이터" },
          ],
          books: [
            { title: "지금 알고 있는 걸 그때도 알았더라면", sub: "강수진" },
            { title: "비포 선셋", sub: "리처드 링클레이터" },
            { title: "비포 선셋", sub: "리처드 링클레이터" },
          ],
          music: [{ title: "Love Shine", sub: "검정치마" }],
          exhibitions: [{ title: "반 고흐 인사이드", sub: "서울" }],
        },
        set_2: {
          title: "두려운 감정을 다독여줄 따듯한",
          movies: [{ title: "인사이드 아웃", sub: "피트 닥터" }],
          books: [{ title: "마당을 나온 암탉", sub: "황선미" }],
          music: [{ title: "너의 의미", sub: "아이유" }],
          exhibitions: [{ title: "모네의 정원", sub: "세종" }],
        },
      },
    },
    {
      id: 2,
      content: "햇빛이 좋아서 기분이 들떴다!",
      username: "username2",
      created_at: "2025-05-02T15:30:00Z",
      main_emotion: "행복",
      analysis: {
        set_1: {
          title: "행복함을 더 오래 간직할 수 있는",
          movies: [
            { title: "미션 임파서블: 데드 레코닝", sub: "크리스토퍼 맥쿼리" },
          ],
          books: [{ title: "달러구트 꿈 백화점", sub: "이미예" }],
          music: [{ title: "뉴진스 - ETA", sub: "뉴진스" }],
          exhibitions: [{ title: "반 고흐 인사이드", sub: "전시감독" }],
        },
      },
    },
  ],
};
