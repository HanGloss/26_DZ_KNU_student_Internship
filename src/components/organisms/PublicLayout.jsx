import BrandLogo from '../atoms/BrandLogo';

/**
 * PublicLayout — 로그인·계정통합·약관·2FA 4개 공개 화면의 공통 골격.
 * 그라데이션 배경 + 중앙 카드 패턴.
 */
export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-brand to-accent animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <BrandLogo inverse size="md" />
        </div>
        {children}
        <div className="text-center mt-5 text-[10px] text-white/70">
          더존비앤씨티 · Education Business Unit
        </div>
      </div>
    </div>
  );
}
