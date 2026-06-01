import { Loader2 } from 'lucide-react';

export default function Spinner({ size = 14, color = 'currentColor' }) {
  return <Loader2 size={size} className="animate-spin" style={{ color }} />;
}
