import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PublicLayout from '../components/organisms/PublicLayout';
import PrimaryButton from '../components/atoms/PrimaryButton';
import { useToast } from '../components/feedback/Toast';

/**
 * TermsAgreementPage — 통합 계정 약관 동의.
 *
 * 멘토 피드백 ③ 답변: 통합 계정 생성 시 약관 동의 단계 명시.
 */
const ITEMS = [
  { key: 'terms', required: true, label: '통합 이용약관 동의' },
  { key: 'privacy', required: true, label: '개인정보 통합 처리 동의' },
  { key: 'history', required: true, label: '두 사이트 학습 이력 연결 동의' },
  { key: 'marketing', required: false, label: '마케팅 정보 수신 동의' },
];

const REQUIRED_KEYS = ITEMS.filter((it) => it.required).map((it) => it.key);

export default function TermsAgreementPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [checks, setChecks] = useState(
    Object.fromEntries(ITEMS.map((it) => [it.key, false]))
  );

  const allRequiredChecked = REQUIRED_KEYS.every((k) => checks[k]);
  const allChecked = Object.values(checks).every(Boolean);

  const toggleAll = () => {
    const next = !allChecked;
    setChecks(Object.fromEntries(ITEMS.map((it) => [it.key, next])));
  };
  const toggle = (k) => setChecks({ ...checks, [k]: !checks[k] });

  return (
    <PublicLayout>
      <div className="bg-white rounded-xl shadow-2xl p-7">
        <div className="text-center mb-5">
          <div className="text-lg font-bold text-navy">약관 동의</div>
          <div className="text-xs mt-1 text-text-gray">
            통합 계정 생성을 위해 다음에 동의해주세요
          </div>
        </div>

        <button
          onClick={toggleAll}
          className={`w-full rounded-lg p-3 mb-3 flex items-center gap-3 border-2 hover:bg-light-gray transition-colors ${
            allChecked ? 'border-brand bg-pale-blue' : 'border-mid-gray bg-white'
          }`}
        >
          <CheckBox checked={allChecked} size={20} />
          <span className="text-sm font-bold text-navy">전체 동의</span>
        </button>

        <div className="space-y-2 mb-5">
          {ITEMS.map((it) => (
            <button
              key={it.key}
              onClick={() => toggle(it.key)}
              className="w-full flex items-center gap-3 py-2 px-1 text-left hover:bg-light-gray rounded transition-colors"
            >
              <CheckBox checked={checks[it.key]} size={16} />
              <span className="text-xs flex-1 text-navy">
                <span
                  className={`font-bold ${it.required ? 'text-red' : 'text-text-gray'}`}
                >
                  [{it.required ? '필수' : '선택'}]
                </span>{' '}
                {it.label}
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  toast(`[${it.label}] 전문은 준비 중입니다`);
                }}
                className="text-[10px] text-text-gray hover:underline cursor-pointer"
              >
                보기
              </span>
            </button>
          ))}
        </div>

        <PrimaryButton
          onClick={() => navigate('/twoFactor')}
          disabled={!allRequiredChecked}
        >
          동의하고 계속하기 →
        </PrimaryButton>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/mergeNotice')}
            className="text-[11px] text-text-gray hover:underline"
          >
            이전으로
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}

function CheckBox({ checked, size }) {
  return (
    <span
      className={`rounded flex items-center justify-center transition-colors ${
        checked ? 'bg-brand border-brand text-white' : 'bg-white border-mid-gray'
      }`}
      style={{ width: size, height: size, borderWidth: 1.5 }}
    >
      {checked && <Check size={Math.round(size * 0.7)} strokeWidth={3} />}
    </span>
  );
}
