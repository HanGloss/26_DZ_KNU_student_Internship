import { Search } from 'lucide-react';

/**
 * SearchBar — 헤더 검색창.
 * 입력은 부모(Header)가 controlled state로 관리.
 * 사용자 액티비티 시그널 수집의 시작점 (검색어 → USER_ACTIVITY_LOG_TB).
 */
export default function SearchBar({ value, onChange, placeholder = '원하는 강의를 검색해보세요' }) {
  return (
    <div className="relative flex-1 max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-gray pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm text-navy rounded-lg bg-light-gray border border-transparent placeholder:text-text-gray focus:bg-white focus:border-brand focus:outline-none transition-colors"
      />
    </div>
  );
}
