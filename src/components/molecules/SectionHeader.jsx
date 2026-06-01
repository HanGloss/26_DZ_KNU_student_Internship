import { ChevronRight } from 'lucide-react';

/**
 * SectionHeader — 메인 화면 섹션 상단 (제목·부제·전체보기).
 */
export default function SectionHeader({ title, subtitle, onMore }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <h2 className="text-xl font-bold text-navy">{title}</h2>
        {subtitle && <p className="text-xs mt-1 text-text-gray">{subtitle}</p>}
      </div>
      {onMore && (
        <button
          onClick={onMore}
          className="text-xs font-semibold text-brand flex items-center gap-1 hover:underline"
        >
          전체보기 <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}
