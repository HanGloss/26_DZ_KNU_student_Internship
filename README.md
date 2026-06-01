<div align="center">

# 재경 링크 (Jaegyeong Link)

회계·세무 실무자를 위한 **온·오프라인 통합 학습 플랫폼**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React%20Router-6.26-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Status](https://img.shields.io/badge/status-v0.5%20presentation-2E8B57)](#)

</div>

![메인 화면](screenshots/05-main.png)

---

## 한 줄 소개

**재경캠퍼스**(`bm.douzoneedu.co.kr`)와 **평생교육원**(`academy.douzoneedu.co.kr`)
두 사이트의 회원 시스템을 단일 USER_TB로 통합하고, 온라인 강의로 기초를 다진 학습자를
오프라인 워크숍과 자연스럽게 연결하는 O2O 학습 경로를 제공한다.

## 주요 특징

- **통합 로그인 + 인증 후속 3단계** — 두 사이트 계정 매핑(1클릭) → 약관 동의 → 2차 인증(mock)
- **3-stage 추천 엔진** — 룰(`COURSE_PREREQUISITE_TB`) → 벡터 유사도 → LLM 재순위.
  카드별로 추천 단계(`SOURCE_STAGE`)와 근거(`REASON_TXT`)가 기록되어 모든 추천이 역추적 가능
- **사용자 액티비티 시그널** — 행동·학습 맥락·환경 시그널을 `USER_ACTIVITY_LOG_TB`에
  적재하여 다음 추천 입력으로 되먹임 (피드백 루프)
- **추천 카드 캐러셀** — 스와이프 + 좌우 화살표. 9개 카드 중 한 화면에 약 5개 노출
- **Atomic Design** — atoms 7 · molecules 7 · organisms 5 · pages 5로 책임 분리

## 미리보기

| 통합 로그인 | 계정 통합 안내 | 약관 동의 |
|:---:|:---:|:---:|
| ![](screenshots/01-login.png) | ![](screenshots/02-merge-notice.png) | ![](screenshots/03-terms.png) |

| 2차 인증 (mock) | 메인 — 추천 캐러셀 |
|:---:|:---:|
| ![](screenshots/04-2fa.png) | ![](screenshots/05-main.png) |

## 인증 플로우

이메일에 `merge`가 포함되면 통합 흐름, 그렇지 않으면 단순 흐름으로 진입한다.
한 사이트에서 두 시나리오를 모두 시연하기 위한 분기.

```
[로그인] ─→ [계정 통합 안내] ─→ [약관 동의] ─→ [2차 인증] ─→ [메인]
   │                                              ▲
   └──────────── (이미 통합된 사용자) ─────────────┘
```

| 경로 | 이메일 예시 | 흐름 |
|---|---|---|
| 통합 흐름 | `merge@example.com` | `/login → /mergeNotice → /terms → /twoFactor → /main` |
| 단순 흐름 | `user@example.com` | `/login → /twoFactor → /main` |

## 기술 스택

| 영역 | 선택 | 비고 |
|---|---|---|
| 빌드 | Vite 5 | 빠른 HMR, ESM 네이티브 |
| 프레임워크 | React 18 | 함수형 컴포넌트 + Hooks |
| 라우팅 | React Router 6 | 선언적 라우트 + Protected Route |
| 스타일 | Tailwind CSS 3 | 디자인 토큰을 `theme.extend`에 등록 |
| 아이콘 | lucide-react | 일관된 stroke 기반 아이콘 세트 |
| 폰트 | Pretendard | CDN 로드 |

## 디렉토리 구조

```
.
├── src/
│   ├── App.jsx                       # React Router 라우팅 + Protected Route
│   ├── main.jsx                      # 진입점
│   ├── index.css                     # Tailwind base
│   │
│   ├── design/
│   │   └── tokens.js                 # 디자인 토큰 단일 출처
│   │
│   ├── data/
│   │   ├── mockUser.js               # 로그인 mock 응답
│   │   └── mockRecommendations.js    # 추천 카드 9건 mock
│   │
│   ├── components/
│   │   ├── atoms/                    # 7개 — Button, Input, Spinner, Badge ...
│   │   ├── molecules/                # 7개 — CourseCard, StageBadge, SearchBar ...
│   │   └── organisms/                # 5개 — Header, RecommendationCarousel,
│   │                                 #       ClickModal, PublicLayout ...
│   │
│   └── pages/                        # 5개 페이지
│       ├── LoginPage.jsx
│       ├── AccountMergeNoticePage.jsx
│       ├── TermsAgreementPage.jsx
│       ├── TwoFactorAuthPage.jsx
│       └── MainPage.jsx
│
├── docs/                             # 설계 문서 (PDF)
│   ├── 01-PM요약보고서.pdf
│   ├── 02-추천시스템설계명세서.pdf
│   └── 03-프론트엔드설계상세본.pdf
│
├── screenshots/                      # README용 5장
└── scripts/
    └── screenshot.js                 # Playwright 자동 캡처
```

## 실행

```bash
npm install
npm run dev
```

기본 포트는 `5173`. `npm run build`로 정적 빌드 산출물 생성(`dist/`).

스크린샷을 다시 찍으려면 `npm run dev` 상태에서 다음을 실행한다.

```bash
node scripts/screenshot.js
```

## 설계 문서

본 저장소는 화면 구현만 담고 있다. 의사결정 근거·DB 모델·추천 엔진 명세 등은
[`docs/`](./docs) 폴더의 세 문서를 참조한다.

- [**PM 요약 보고서**](./docs/01-PM요약보고서.pdf) — 사이트 구조 · 화면 단위 · 컴포넌트 매트릭스
- [**추천 시스템 설계 명세서**](./docs/02-추천시스템설계명세서.pdf) — 추천 조건 · 액티비티 시그널 · 컴포넌트 연결 · 경로 추적
- [**프론트엔드 설계 상세본**](./docs/03-프론트엔드설계상세본.pdf) — 전체 설계 근거 (26p)

## 5주차 범위와 그 이후

| 범위 | 5주차 (현재) | 6주차 이후 |
|---|---|---|
| 인증 | mock 응답 + 페이지 분기 | 실제 OAuth / JWT |
| 추천 | mock 9건 + 캐러셀 UI | `useQuery` + `GET /api/recommendation` |
| 카드 클릭 | 모달로 우회 | `/courses/:id` 페이지 |
| 상태 보존 | 메모리 | localStorage / 서버 세션 |
| 검색·찜·진도 | UI placeholder | 백엔드 연동 + 액티비티 적재 |

---

<details>
<summary>인턴십 컨텍스트</summary>

2026 더존비앤씨티 교육사업부문 인턴십 — 시스템 Unit · 5주차 산출물 (v0.5).
6주차에 본격적인 React 본 구현(라우터·서버 상태)으로 확장한다.

</details>
