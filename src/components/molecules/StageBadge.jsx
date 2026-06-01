import { Filter, Layers, Sparkles } from 'lucide-react';

/**
 * StageBadge — 추천 카드 좌상단에 붙는 작은 뱃지.
 * 사용자에겐 알고리즘 명칭(RULE/VECTOR/LLM) 대신 가치 라벨로 보인다.
 */
const STAGE_CONFIG = {
  RULE: {
    label: '후속 코스',
    Icon: Filter,
    className: 'bg-pale-blue text-brand',
  },
  VECTOR: {
    label: '관련 분야',
    Icon: Layers,
    className: 'bg-pale-orange text-orange',
  },
  LLM: {
    label: 'AI 추천',
    Icon: Sparkles,
    className: 'bg-pale-red text-red',
  },
};

export default function StageBadge({ stage }) {
  const config = STAGE_CONFIG[stage] ?? STAGE_CONFIG.RULE;
  const { label, Icon, className } = config;
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${className}`}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}
