/**
 * Avatar — 사용자 이름 첫 글자를 원형 컬러 배경에 표시한다.
 * 이미지 업로드 도입 전 단계의 단순 구현.
 */
export default function Avatar({ name = '', size = 32 }) {
  const initial = name.trim().charAt(0) || '?';
  return (
    <div
      className="rounded-full bg-brand text-white font-bold flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {initial}
    </div>
  );
}
