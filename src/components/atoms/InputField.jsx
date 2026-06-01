/**
 * InputField — 라벨 + 입력창 + 우측 아이콘(선택) 묶음.
 */
export default function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  rightSlot,
  autoComplete,
}) {
  return (
    <label className="block">
      {label && (
        <span className="block text-xs font-bold text-navy mb-1.5">{label}</span>
      )}
      <span className="relative block">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 transition-colors ${
            error ? 'border-red' : 'border-mid-gray focus:border-brand'
          }`}
        />
        {rightSlot && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </span>
    </label>
  );
}
