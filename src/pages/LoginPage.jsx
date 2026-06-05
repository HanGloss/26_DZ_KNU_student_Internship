import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'lucide-react';

import PublicLayout from '../components/organisms/PublicLayout';
import InputField from '../components/atoms/InputField';
import PrimaryButton from '../components/atoms/PrimaryButton';
import ErrorMessage from '../components/atoms/ErrorMessage';
import Spinner from '../components/atoms/Spinner';
import LegacySiteSSO from '../components/molecules/LegacySiteSSO';
import { useToast } from '../components/feedback/Toast';
import { MOCK_USER } from '../data/mockUser';

/**
 * LoginPage — 통합 로그인 진입점.
 *
 * 인증 성공 시 이메일에 "merge"가 포함되면 → /mergeNotice (통합 흐름),
 * 그 외엔 → /twoFactor (단순 흐름). 발표 시연용 분기.
 */
export default function LoginPage({ onAuthenticated }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('p@ssword!');
  const [showPw, setShowPw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 600)); // mock latency

    if (password.length < 6) {
      setIsSubmitting(false);
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    const needsMerge = email.toLowerCase().includes('merge');
    onAuthenticated({ ...MOCK_USER, email });
    setIsSubmitting(false);
    navigate(needsMerge ? '/mergeNotice' : '/twoFactor');
  };

  const handleSSO = (site) => {
    // 기존 사이트 계정으로 로그인 (mock) — 통합 안내 흐름으로 진입
    onAuthenticated({ ...MOCK_USER, email: `sso@${site.host}` });
    toast(`${site.label}으로 로그인합니다`);
    navigate('/mergeNotice');
  };

  return (
    <PublicLayout>
      <div className="bg-white rounded-xl shadow-2xl p-7">
        <div className="text-center mb-5">
          <div className="text-lg font-bold text-navy">로그인</div>
          <div className="text-xs mt-1 text-text-gray">
            재경캠퍼스 · 평생교육원 통합 계정
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
          />
          <InputField
            label="비밀번호"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            error={!!error}
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
                className="text-text-gray hover:text-navy"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-text-gray cursor-pointer">
              <input type="checkbox" className="rounded" />
              로그인 상태 유지
            </label>
            <button
              type="button"
              onClick={() => toast('비밀번호 찾기는 준비 중입니다')}
              className="font-semibold text-brand hover:underline"
            >
              비밀번호 찾기 →
            </button>
          </div>

          {error && <ErrorMessage message={error} />}

          <PrimaryButton type="submit" loading={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner /> 인증 중…
              </>
            ) : (
              <>
                <LogIn size={14} /> 로그인
              </>
            )}
          </PrimaryButton>
        </form>

        <LegacySiteSSO onSelect={handleSSO} />

        <div className="text-center mt-5 text-[11px] text-text-gray">
          아직 계정이 없으신가요?{' '}
          <button
            onClick={() => toast('회원가입은 준비 중입니다')}
            className="font-bold text-brand hover:underline"
          >
            회원가입 →
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}
