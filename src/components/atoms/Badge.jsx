/**
 * Badge — 카드의 카테고리·과정 유형 등을 표시하는 작은 라벨.
 *
 * @param {'blue'|'orange'|'green'|'gray'} tone
 */
export default function Badge({ children, tone = 'blue' }) {
  const palette = {
    blue: 'bg-pale-blue text-brand',
    orange: 'bg-pale-orange text-orange',
    green: 'bg-pale-green text-green',
    gray: 'bg-light-gray text-text-gray',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${palette[tone]}`}
    >
      {children}
    </span>
  );
}
