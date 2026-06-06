import { Bell, GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../atoms/BrandLogo';
import SearchBar from '../molecules/SearchBar';
import Avatar from '../atoms/Avatar';
import { useToast } from '../feedback/Toast';

/**
 * Header — 메인 화면 상단 다크 네이비 헤더.
 * Logo(클릭 시 메인) · 검색 · (내 강의실 / 알림 / 사용자 / 로그아웃).
 */
export default function Header({ user, searchKeyword, onSearchChange, onLogout }) {
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <BrandLogo size="sm" inverse onClick={() => navigate('/main')} />

        <SearchBar value={searchKeyword} onChange={onSearchChange} />

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => toast('내 강의실은 준비 중입니다')}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/90 hover:bg-white/10 transition-colors"
          >
            <GraduationCap size={16} />
            내 강의실
          </button>
          <button
            onClick={() => toast('새 알림이 없습니다')}
            aria-label="알림"
            className="p-2 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
          >
            <Bell size={16} />
          </button>
          <Avatar name={user?.userNm} size={30} />
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/90 hover:bg-white/10 transition-colors"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">로그아웃</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
