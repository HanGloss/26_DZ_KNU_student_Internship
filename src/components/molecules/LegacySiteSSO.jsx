/**
 * LegacySiteSSO — 기존 사이트(재경캠퍼스·평생교육원) 계정으로 로그인.
 * 사이트 통합 패턴 참고: Google · 카카오 · 잡코리아+알바몬 등.
 * 6주차에 OAuth 도입 시 실제 인증 연결.
 */
const SITES = [
  { label: '재경캠퍼스 계정', host: 'bm.douzoneedu.co.kr' },
  { label: '평생교육원 계정', host: 'academy.douzoneedu.co.kr' },
];

export default function LegacySiteSSO() {
  return (
    <div>
      <div className="flex items-center my-5 gap-3">
        <div className="flex-1 h-px bg-mid-gray/50" />
        <span className="text-[10px] text-text-gray">또는</span>
        <div className="flex-1 h-px bg-mid-gray/50" />
      </div>
      <div className="text-center text-[10px] text-text-gray mb-2.5">
        기존 사이트 계정으로 로그인
      </div>
      <div className="grid grid-cols-2 gap-2">
        {SITES.map((site) => (
          <button
            key={site.host}
            type="button"
            className="py-2 rounded text-[11px] border border-mid-gray text-navy bg-white hover:bg-light-gray transition-colors"
          >
            {site.label}
          </button>
        ))}
      </div>
    </div>
  );
}
