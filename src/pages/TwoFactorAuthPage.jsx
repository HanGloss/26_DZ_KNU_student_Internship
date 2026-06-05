import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import PublicLayout from '../components/organisms/PublicLayout';
import PrimaryButton from '../components/atoms/PrimaryButton';
import ErrorMessage from '../components/atoms/ErrorMessage';
import Spinner from '../components/atoms/Spinner';
import { useToast } from '../components/feedback/Toast';

/**
 * TwoFactorAuthPage — 2차 인증 (mock).
 * 6자리 코드 input + 확인. 실제 발송은 6주차+.
 *
 * 멘토 피드백 ② 답변: 보안 강화를 위한 2차 인증 단계 mock.
 */
export default function TwoFactorAuthPage({ user }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('6자리 인증 코드를 입력해주세요');
      return;
    }
    setError(null);
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 500));
    navigate('/main');
  };

  return (
    <PublicLayout>
      <div className="bg-white rounded-xl shadow-2xl p-7">
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-pale-blue text-brand">
            <Lock size={20} />
          </div>
          <div className="text-lg font-bold text-navy">2차 인증</div>
          <div className="text-xs mt-1 text-text-gray">
            <span className="font-semibold text-navy">{user?.email}</span>로<br />
            6자리 인증 코드를 발송했습니다
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className={`w-full text-center text-2xl font-bold py-3 rounded border focus:outline-none focus:ring-2 focus:ring-brand/20 text-navy ${
              error ? 'border-red' : 'border-mid-gray focus:border-brand'
            }`}
            style={{ letterSpacing: '0.5em' }}
          />
          {error && (
            <div className="mt-2">
              <ErrorMessage message={error} />
            </div>
          )}
        </div>

        <PrimaryButton onClick={handleVerify} loading={isVerifying}>
          {isVerifying ? (
            <>
              <Spinner /> 확인 중…
            </>
          ) : (
            '인증하기'
          )}
        </PrimaryButton>

        <div className="flex items-center justify-center gap-3 mt-4 text-[11px]">
          <button
            onClick={() => toast('인증 코드를 재발송했습니다')}
            className="text-brand hover:underline"
          >
            인증 코드 재발송
          </button>
          <span className="text-mid-gray">·</span>
          <button
            onClick={() => toast('다른 인증 방법은 준비 중입니다')}
            className="text-text-gray hover:underline"
          >
            다른 방법으로 인증
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}
