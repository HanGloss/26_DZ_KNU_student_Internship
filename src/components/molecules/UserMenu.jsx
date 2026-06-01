import { LogOut } from 'lucide-react';
import Avatar from '../atoms/Avatar';

/**
 * UserMenu — 헤더 우측 사용자 메뉴.
 * 5주차에선 아바타 + 이름 + 로그아웃 버튼만. 6주차에 드롭다운 도입.
 */
export default function UserMenu({ user, onLogout }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={user?.userNm} size={32} />
      <div className="hidden sm:block">
        <div className="text-xs font-bold text-navy">{user?.userNm}</div>
        <div className="text-[10px] text-text-gray">{user?.companyNm}</div>
      </div>
      <button
        onClick={onLogout}
        aria-label="로그아웃"
        className="p-1.5 rounded hover:bg-light-gray transition-colors"
      >
        <LogOut size={16} className="text-text-gray" />
      </button>
    </div>
  );
}
