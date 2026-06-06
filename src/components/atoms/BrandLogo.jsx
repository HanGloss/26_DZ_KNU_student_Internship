import { BookOpen } from 'lucide-react';

/**
 * BrandLogo — 좌상단 로고 (아이콘 + 텍스트).
 * onClick 이 주어지면 클릭 가능한 버튼으로 렌더(예: 헤더 → 메인 이동).
 * inverse=true 는 다크 배경용(흰 로고).
 */
export default function BrandLogo({ inverse = false, size = 'md', onClick }) {
  const sizes = {
    sm: { box: 'w-7 h-7', icon: 16, text: 'text-base' },
    md: { box: 'w-9 h-9', icon: 20, text: 'text-2xl' },
  };
  const s = sizes[size];

  const inner = (
    <>
      <span
        className={`${s.box} rounded-lg flex items-center justify-center ${
          inverse ? 'bg-white text-brand' : 'bg-brand text-white'
        }`}
      >
        <BookOpen size={s.icon} strokeWidth={2.5} />
      </span>
      <span
        className={`font-bold tracking-tight ${s.text} ${
          inverse ? 'text-white' : 'text-navy'
        }`}
      >
        재경 링크
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-label="메인으로 이동"
        className="inline-flex items-center gap-2 rounded-lg hover:opacity-80 transition-opacity"
      >
        {inner}
      </button>
    );
  }

  return <span className="inline-flex items-center gap-2">{inner}</span>;
}
