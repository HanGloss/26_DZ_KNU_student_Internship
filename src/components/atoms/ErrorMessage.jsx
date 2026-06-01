import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-center gap-1.5 text-xs text-red bg-pale-red rounded px-2.5 py-2"
    >
      <AlertCircle size={13} />
      <span>{message}</span>
    </div>
  );
}
