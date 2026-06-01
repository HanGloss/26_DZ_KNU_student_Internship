import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import PublicLayout from '../components/organisms/PublicLayout';
import PrimaryButton from '../components/atoms/PrimaryButton';

/**
 * AccountMergeNoticePage — 두 사이트 계정 통합 안내.
 * 동일 이메일이 양쪽 사이트에 존재할 때 노출. "통합하기 →" 1클릭으로 다음 단계.
 *
 * 멘토 피드백 ① 답변: 사용자가 최소한의 클릭으로 통합 로그인.
 */
const SITES = [
  { tag: '재', name: '재경캠퍼스', host: 'bm.douzoneedu.co.kr', bg: 'bg-brand' },
  { tag: '평', name: '평생교육원', host: 'academy.douzoneedu.co.kr', bg: 'bg-orange' },
];

export default function AccountMergeNoticePage({ user }) {
  const navigate = useNavigate();

  return (
    <PublicLayout>
      <div className="bg-white rounded-xl shadow-2xl p-7">
        <div className="text-center mb-5">
          <div className="text-lg font-bold text-navy">계정 통합</div>
          <div className="text-xs mt-1 text-text-gray">
            동일 이메일로 두 사이트 계정이 확인되었습니다
          </div>
        </div>

        <div className="space-y-2 mb-5">
          {SITES.map((site) => (
            <div
              key={site.tag}
              className="rounded-lg p-3 border border-mid-gray bg-light-gray flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${site.bg}`}
              >
                {site.tag}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-navy">{site.name}</div>
                <div className="text-[10px] text-text-gray">
                  {site.host} · {user?.email}
                </div>
              </div>
              <CheckCircle2 size={14} className="text-green" />
            </div>
          ))}
        </div>

        <div className="rounded p-3 mb-5 text-[11px] leading-relaxed bg-pale-blue text-navy">
          두 사이트의 학습 이력을 하나의 계정으로 통합합니다. 통합 후 어느 사이트에서
          수강하시든 모든 이력이 한 곳에 누적됩니다.
        </div>

        <PrimaryButton onClick={() => navigate('/terms')}>통합하기 →</PrimaryButton>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/twoFactor')}
            className="text-[11px] text-text-gray hover:underline"
          >
            지금은 건너뛰기
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-mid-gray text-[10px] text-center text-text-gray">
          다음 단계에서 통합 약관 동의가 필요합니다
        </div>
      </div>
    </PublicLayout>
  );
}
