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

export default function CategoryCarousel() {
  return (
    <div className="mt-8">
      <div className="text-sm font-bold text-navy mb-2">카테고리별 둘러보기</div>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <CategoryChip key={cat} label={cat} />
        ))}
      </div>
    </div>
  );
}
