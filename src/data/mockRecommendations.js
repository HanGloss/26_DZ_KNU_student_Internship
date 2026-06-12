/**
 * 추천 카드 mock 데이터 (9건).
 * 실제 백엔드에서는 GET /api/recommendation 응답으로 받는다.
 * stage: RULE | VECTOR | LLM — 3-stage Hybrid 추천 엔진의 결정 단계
 * confidence: 콘텐츠 기반 매칭도 (0~1)
 * matchFactors: 매칭 근거 — kind(history|interest|level|trend|instructor) + text
 * instructorId: 담당 강사 (mockInstructors 참조). 강사 인기·실력이 점수에 가산된다.
 */
import { MOCK_INSTRUCTORS, instructorScore } from './mockInstructors';

export const MOCK_RECOMMENDATIONS = [
  {
    recId: 'R001',
    courseNm: '부가세 신고 실습 워크숍',
    courseType: 'OFFLINE',
    stage: 'RULE',
    confidence: 0.95,
    instructorId: 'INS01',
    reason: '부가세 기초 수강자에게 즉시 적용 가능한 실습 워크숍입니다.',
    matchFactors: [
      { kind: 'history', text: '부가세 기초 과정 수강 완료' },
      { kind: 'level', text: '이론 학습 후 실습 진입 단계' },
    ],
    sessionDate: '2026-05-24',
    venue: '강남 교육센터 3층',
    duration: '8시간 (1일)',
    enrolledCount: 1280,
  },
  {
    recId: 'R002',
    courseNm: '세무회계 기초 실무',
    courseType: 'OFFLINE',
    stage: 'RULE',
    confidence: 1.0,
    instructorId: 'INS05',
    reason: '회계원리 입문 수강 완료자를 위한 세무 실무 기초 과정입니다.',
    matchFactors: [
      { kind: 'history', text: '회계원리 입문 수강 완료' },
      { kind: 'interest', text: '세무 실무 관심 분야' },
    ],
    sessionDate: '2026-05-30',
    venue: '강남 교육센터 5층',
    duration: '6시간',
    enrolledCount: 940,
  },
  {
    recId: 'R003',
    courseNm: '원천세 실무 마스터 클래스',
    courseType: 'ONLINE',
    stage: 'VECTOR',
    confidence: 0.87,
    instructorId: 'INS01',
    reason: '관심 분야 학습 이력과 의미적으로 유사한 실무 과정입니다.',
    matchFactors: [
      { kind: 'interest', text: '관심 분야와 주제 유사도 높음' },
      { kind: 'history', text: '세무 분야 학습 이력 다수' },
    ],
    sessionDate: '상시 수강',
    venue: 'VOD · 24시간',
    duration: '12시간 (분할 수강)',
    enrolledCount: 2150,
  },
  {
    recId: 'R004',
    courseNm: '회계 결산 시뮬레이션',
    courseType: 'BLEND',
    stage: 'VECTOR',
    confidence: 0.81,
    instructorId: 'INS02',
    reason: '온라인 강의로 이론을 다지고 오프라인에서 실제 데이터로 실습합니다.',
    matchFactors: [
      { kind: 'history', text: '회계 이론 학습 이력' },
      { kind: 'level', text: '실무 데이터 적용 단계' },
    ],
    sessionDate: '2026-06-03',
    venue: 'VOD + 강남 교육센터',
    duration: '16시간 (혼합)',
    enrolledCount: 760,
  },
  {
    recId: 'R005',
    courseNm: '재무제표 작성 실습',
    courseType: 'OFFLINE',
    stage: 'LLM',
    confidence: 0.92,
    instructorId: 'INS02',
    reason:
      '최근 부가세→결산 흐름을 학습 중이시군요. 자연스러운 다음 단계로 재무제표 작성 실습을 권장드립니다.',
    matchFactors: [
      { kind: 'trend', text: '부가세 → 결산으로 이어진 학습 흐름' },
      { kind: 'level', text: '재무제표 작성 역량 보강 시점' },
    ],
    sessionDate: '2026-06-10',
    venue: '분당 교육센터 3층',
    duration: '8시간 (1일)',
    enrolledCount: 610,
  },
  {
    recId: 'R006',
    courseNm: '법인세 신고 실무',
    courseType: 'OFFLINE',
    stage: 'RULE',
    confidence: 1.0,
    instructorId: 'INS03',
    reason: '세무회계 기초 수강 완료자를 위한 법인세 신고 실무 과정입니다.',
    matchFactors: [
      { kind: 'history', text: '세무회계 기초 수강 완료' },
      { kind: 'level', text: '법인세 실무 진입 단계' },
    ],
    sessionDate: '2026-06-14',
    venue: '강남 교육센터 4층',
    duration: '8시간 (1일)',
    enrolledCount: 880,
  },
  {
    recId: 'R007',
    courseNm: '연말정산 종합 실무',
    courseType: 'BLEND',
    stage: 'VECTOR',
    confidence: 0.83,
    instructorId: 'INS05',
    reason: '세무 분야 학습 이력과 의미적으로 가까운 시즌 실무 과정입니다.',
    matchFactors: [
      { kind: 'interest', text: '세무 분야 관심도 높음' },
      { kind: 'trend', text: '연말정산 시즌 실무 수요' },
    ],
    sessionDate: '2026-11-22',
    venue: 'VOD + 2회 오프라인',
    duration: '20시간 (혼합)',
    enrolledCount: 1730,
  },
  {
    recId: 'R008',
    courseNm: '회계감사 실무 기초',
    courseType: 'ONLINE',
    stage: 'VECTOR',
    confidence: 0.76,
    instructorId: 'INS04',
    reason: '회계 결산 영역의 다음 확장 분야로, 의미 유사도가 높은 강의입니다.',
    matchFactors: [
      { kind: 'interest', text: '회계 결산 인접 분야' },
      { kind: 'history', text: '결산 영역 학습 이력' },
    ],
    sessionDate: '상시 수강',
    venue: 'VOD · 24시간',
    duration: '10시간 (분할)',
    enrolledCount: 540,
  },
  {
    recId: 'R009',
    courseNm: '세무조정 심화 과정',
    courseType: 'OFFLINE',
    stage: 'LLM',
    confidence: 0.89,
    instructorId: 'INS03',
    reason:
      '법인세 실무에 이어 세무조정까지 — 실무 깊이를 한 단계 올리는 흐름을 인식해 추천드립니다.',
    matchFactors: [
      { kind: 'trend', text: '법인세 → 세무조정 심화 흐름' },
      { kind: 'level', text: '실무 깊이 확장 단계' },
    ],
    sessionDate: '2026-07-05',
    venue: '분당 교육센터 3층',
    duration: '16시간 (2일)',
    enrolledCount: 720,
  },
];

/**
 * 강사 가산점을 콘텐츠 매칭도에 합산한 보정 점수.
 *   adjustedConfidence = baseConfidence * (1-W) + instructorScore * W   (W=0.2)
 * 강사 비중을 20%로 둬, 인기·고평점 강사 과정이 정렬에서 우위를 갖되
 * 콘텐츠 적합도가 여전히 주도하도록 한다. 결과는 0~1 로 클램프.
 */
const INSTRUCTOR_WEIGHT = 0.2;

export function enrichRecommendations(recs = MOCK_RECOMMENDATIONS) {
  return recs.map((rec) => {
    const instructor = MOCK_INSTRUCTORS[rec.instructorId] ?? null;
    const insScore = instructorScore(instructor);
    const adjusted = Math.min(
      1,
      (rec.confidence ?? 0) * (1 - INSTRUCTOR_WEIGHT) + insScore * INSTRUCTOR_WEIGHT,
    );

    // 강사 근거를 matchFactors 맨 앞에 자동 주입 (평점 4.7↑ & 인기 0.8↑)
    const factors = [...(rec.matchFactors ?? [])];
    if (instructor && instructor.rating >= 4.7 && instructor.popularity >= 0.8) {
      factors.unshift({
        kind: 'instructor',
        text: `${instructor.name} ${instructor.title} · 평점 ${instructor.rating} · 수강생 만족도 상위`,
      });
    }

    return {
      ...rec,
      instructor,
      baseConfidence: rec.confidence,
      confidence: adjusted,
      matchFactors: factors,
    };
  });
}
