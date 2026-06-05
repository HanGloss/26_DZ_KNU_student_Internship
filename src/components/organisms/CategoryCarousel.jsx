import CategoryChip from '../molecules/CategoryChip';

const CATEGORIES = [
  '부가세',
  '원천세',
  '법인세',
  '회계 결산',
  '재무제표',
  '세무조정',
  '법정교육',
  '직장인 역량',
];

/**
 * CategoryCarousel — 카테고리 칩 목록.
 * 칩 클릭 시 부모(MainPage)의 onSelect 로 활성 카테고리를 토글한다.
 * 같은 칩을 다시 누르면 해제(전체 보기).
 */
export default function CategoryCarousel({ active, onSelect }) {
  return (
    <div className="mt-8">
      <div className="text-sm font-bold text-navy mb-2">카테고리별 둘러보기</div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={active === cat}
            onClick={() => onSelect?.(active === cat ? null : cat)}
          />
        ))}
      </div>
    </div>
  );
}
