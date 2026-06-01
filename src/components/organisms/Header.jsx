import BrandLogo from '../atoms/BrandLogo';
import SearchBar from '../molecules/SearchBar';
import UserMenu from '../molecules/UserMenu';

/**
 * Header — 인증 화면 상단 공통 헤더.
 * Logo · SearchBar · UserMenu 세 자식을 가지며, 검색어를 local state로 보유한다.
 */
export default function Header({ user, searchKeyword, onSearchChange, onLogout }) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-mid-gray/40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <BrandLogo size="sm" />
        <SearchBar value={searchKeyword} onChange={onSearchChange} />
        <UserMenu user={user} onLogout={onLogout} />
      </div>
    </header>
  );
}
