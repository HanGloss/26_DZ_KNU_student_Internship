/**
 * CategoryChip — 가로 스크롤 캐러셀에 들어가는 카테고리 알약 1개.
 * 클릭 시 해당 카테고리로 추천 목록을 필터링한다.
 * (실서비스에선 클릭 시 액티비티 로그 USER_ACTIVITY_LOG_TB 에도 시그널 적재)
 */
export default function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs border transition-colors ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-mid-gray bg-white text-text-gray hover:border-text-gray hover:text-navy'
      }`}
    >
      {label}
    </button>
  );
}
