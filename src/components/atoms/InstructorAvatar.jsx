/**
 * InstructorAvatar — 강사 일러스트 아바타 (초상권 회피).
 *
 * 실제 사진을 쓰지 않고, seed로부터 결정적으로 얼굴 구성요소를 골라
 * 강사마다 "확연히 다른 얼굴"이 나오도록 한다. 같은 seed면 항상 같은 얼굴.
 *
 * 변주: 배경색 / 피부톤 / 헤어(색·앞머리·옆길이) / 안경 / 표정 / 상의색.
 * 모두 SVG 도형으로만 그려 외부 이미지·CDN 의존이 없다.
 */

function hashSeed(seed = '') {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const BG = ['#E8F2FB', '#E8F5EE', '#FCEEDD', '#F2EAFA', '#FBEBE7'];
const SKIN = ['#F6D5B8', '#E8B98F', '#C9926B'];
const HAIR = ['#2B2B33', '#5A3A24', '#7A5230', '#1F2A44', '#8A8A8A'];
const TOP = ['#1F2A44', '#0B5FAE', '#2E8B57', '#6B3FA0', '#C0392B'];

export default function InstructorAvatar({ seed = '', size = 44, ring = true }) {
  const h = hashSeed(seed);
  const bg = BG[h % BG.length];
  const skin = SKIN[(h >> 3) % SKIN.length];
  const hair = HAIR[(h >> 5) % HAIR.length];
  const top = TOP[(h >> 13) % TOP.length];
  const hairLen = (h >> 7) % 3; // 0 짧음 / 1 중간 / 2 긴머리(옆으로)
  const bangs = (h >> 8) % 3; // 0 가르마 / 1 일자뱅 / 2 넘긴머리
  const glasses = ((h >> 9) % 5) < 2; // ~40% 안경
  const smile = ((h >> 11) % 2) === 0;
  const browUp = ((h >> 17) % 2) === 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="강사 일러스트"
      style={{ display: 'block', borderRadius: '9999px' }}
    >
      <circle cx="32" cy="32" r="32" fill={bg} />
      {ring && <circle cx="32" cy="32" r="31" fill="none" stroke="#ffffff" strokeWidth="2" />}

      {/* 어깨/상의 (강사마다 색 변주) */}
      <path d="M12 64 C12 49, 52 49, 52 64 Z" fill={top} />
      <rect x="28" y="49" width="8" height="6" fill={skin} />

      {/* 긴머리: 얼굴 옆으로 흘러내림 */}
      {hairLen === 2 && (
        <path d="M14 30 Q14 56, 24 58 L24 34 Q14 30 14 30 Z M50 30 Q50 56, 40 58 L40 34 Q50 30 50 30 Z" fill={hair} />
      )}

      {/* 머리(뒤통수) */}
      {hairLen === 0 && <ellipse cx="32" cy="25" rx="16" ry="14" fill={hair} />}
      {hairLen === 1 && <ellipse cx="32" cy="27" rx="18" ry="17" fill={hair} />}
      {hairLen === 2 && <ellipse cx="32" cy="28" rx="19" ry="19" fill={hair} />}

      {/* 얼굴 */}
      <ellipse cx="32" cy="33" rx="13.5" ry="14.5" fill={skin} />
      {/* 귀 */}
      <circle cx="18.5" cy="34" r="2.4" fill={skin} />
      <circle cx="45.5" cy="34" r="2.4" fill={skin} />

      {/* 앞머리 변주 */}
      {bangs === 0 && <path d="M19 27 Q32 14, 45 27 Q44 19, 32 19 Q23 19, 19 27 Z" fill={hair} />}
      {bangs === 1 && <path d="M20 26 L44 26 Q44 18, 32 18 Q20 18, 20 26 Z" fill={hair} />}
      {bangs === 2 && <path d="M19 26 Q26 17, 46 21 Q40 17, 32 18 Q22 19, 19 26 Z" fill={hair} />}

      {/* 눈썹 */}
      {browUp ? (
        <>
          <path d="M23 29 q3 -2 6 0" stroke="#5a4636" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d="M35 29 q3 -2 6 0" stroke="#5a4636" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M23 30 h6" stroke="#5a4636" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M35 30 h6" stroke="#5a4636" strokeWidth="1.2" strokeLinecap="round" />
        </>
      )}

      {/* 눈 */}
      <circle cx="26" cy="34" r="1.9" fill="#2B2B33" />
      <circle cx="38" cy="34" r="1.9" fill="#2B2B33" />

      {/* 안경 */}
      {glasses && (
        <g stroke="#1F2A44" strokeWidth="1.4" fill="none">
          <circle cx="26" cy="34" r="4.4" />
          <circle cx="38" cy="34" r="4.4" />
          <path d="M30.4 34 h3.2" />
          <path d="M21.6 34 h-3" />
          <path d="M42.4 34 h3" />
        </g>
      )}

      {/* 코 */}
      <path d="M32 35 v3" stroke={skin === '#C9926B' ? '#a9754f' : '#d9a878'} strokeWidth="1.4" strokeLinecap="round" />

      {/* 입 */}
      {smile ? (
        <path d="M28 41 Q32 45, 36 41" stroke="#9B5C5C" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M29 42 h6" stroke="#9B5C5C" strokeWidth="1.7" strokeLinecap="round" />
      )}
    </svg>
  );
}
