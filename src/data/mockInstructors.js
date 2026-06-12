/**
 * 강사 mock 데이터.
 * 실제 백엔드에서는 INSTRUCTOR_TB + 집계 뷰(평점·수강생·만족도)로부터 받는다.
 *
 * 추천 점수 보정에 쓰이는 필드:
 *   rating       : 강의 평점 (0~5)        — 강의 실력 신호
 *   popularity   : 인기도 (0~1, 정규화)    — 누적 수강·재수강 신호
 *   reviewCount  : 후기 수                 — 신뢰도(표본) 신호
 *
 * instructorScore = 0.5*rating/5 + 0.4*popularity + 0.1*min(reviewCount/500,1)
 * → 0~1 로 정규화된 "강사 가산점". 추천 confidence에 가중 합산된다.
 *
 * avatarSeed : 강사마다 다른 얼굴(SVG 아바타)을 만들기 위한 시드.
 *              실제 사진(초상권)을 쓰지 않고 일러스트로 대체한다.
 */
export const MOCK_INSTRUCTORS = {
  INS01: {
    instructorId: 'INS01',
    name: '한지원',
    title: '세무사',
    expertise: '부가세 · 원천세 실무',
    rating: 4.9,
    popularity: 0.96,
    reviewCount: 412,
    avatarSeed: 'hanjiwon',
    bio: '15년차 세무 실무 강사. 신고 시즌 실전 케이스 강의로 인기.',
  },
  INS02: {
    instructorId: 'INS02',
    name: '오세훈',
    title: '회계사',
    expertise: '결산 · 재무제표',
    rating: 4.8,
    popularity: 0.91,
    reviewCount: 357,
    avatarSeed: 'osehun',
    bio: '결산 시뮬레이션을 실데이터로 풀어내는 강의가 강점.',
  },
  INS03: {
    instructorId: 'INS03',
    name: '문가영',
    title: '세무사',
    expertise: '법인세 · 세무조정',
    rating: 4.7,
    popularity: 0.84,
    reviewCount: 289,
    avatarSeed: 'mungayoung',
    bio: '법인세 신고~세무조정 흐름을 단계별로 설계하는 심화 강사.',
  },
  INS04: {
    instructorId: 'INS04',
    name: '배정훈',
    title: '회계사',
    expertise: '회계감사 · 내부통제',
    rating: 4.5,
    popularity: 0.72,
    reviewCount: 168,
    avatarSeed: 'baejunghoon',
    bio: '감사 실무 기초를 처음 접하는 학습자 눈높이로 풀어주는 강사.',
  },
  INS05: {
    instructorId: 'INS05',
    name: '신유진',
    title: '세무사',
    expertise: '연말정산 · 원천징수',
    rating: 4.85,
    popularity: 0.88,
    reviewCount: 331,
    avatarSeed: 'shinyujin',
    bio: '연말정산 시즌마다 마감되는 인기 실무 강의를 운영.',
  },
};

/** 0~1 로 정규화된 강사 가산점. */
export function instructorScore(ins) {
  if (!ins) return 0;
  const r = (ins.rating ?? 0) / 5;
  const p = ins.popularity ?? 0;
  const c = Math.min((ins.reviewCount ?? 0) / 500, 1);
  return 0.5 * r + 0.4 * p + 0.1 * c;
}
