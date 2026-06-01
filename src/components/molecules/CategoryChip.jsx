/**
 * CategoryChip — 가로 스크롤 캐러셀에 들어가는 카테고리 알약 1개.
 * 클릭 시 액티비티 로그(USER_ACTIVITY_LOG_TB)에 시그널 적재.
 */
export default function CategoryChip({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-4 py-2 rounded-full text-xs border border-mid-gray bg-white text-text-gray hover:border-text-gray hover:text-navy transition-colors"
    >
      {label}
    </button>
  );
}
