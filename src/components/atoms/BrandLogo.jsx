import { BookOpen } from 'lucide-react';

/**
 * BrandLogo — 좌상단 로고 (아이콘 + 텍스트).
 * /login 등 인증 화면에선 흰 배경, 메인 화면에선 컬러 배경 변형.
 */
export default function BrandLogo({ inverse = false, size = 'md' }) {
  const sizes = {
    sm: { box: 'w-7 h-7', icon: 16, text: 'text-base' },
    md: { box: 'w-9 h-9', icon: 20, text: 'text-2xl' },
  };
  const s = sizes[size];
  return (
    <span className="inline-flex items-center gap-2">
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
    </span>
  );
}
