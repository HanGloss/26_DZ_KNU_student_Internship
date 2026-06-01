/**
 * PrimaryButton — 주요 액션 버튼 (로그인·인증·신청 등).
 *
 * @param {boolean} loading - true 면 disabled + 시각적 비활성
 * @param {string} className - 추가 클래스 (전체 너비 등)
 */
export default function PrimaryButton({
  children,
  loading,
  disabled,
  className = '',
  ...rest
}) {
  const isDisabled = loading || disabled;
  return (
    <button
      disabled={isDisabled}
      className={`w-full py-2.5 rounded font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity ${
        isDisabled ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'
      } bg-brand ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
