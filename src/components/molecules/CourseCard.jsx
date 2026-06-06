import { BookOpen, Calendar, MapPin } from 'lucide-react';
import StageBadge from './StageBadge';

/**
 * CourseCard — 추천 카드 1장 (초안 구조).
 * 유형별 컬러 썸네일 + 유형 뱃지(좌상단) + 스테이지 뱃지(우상단)
 * + 매칭도 프로그레스 바 + "상세 보기" CTA.
 *
 * NOTE: Tailwind는 런타임 조합 클래스를 인식하지 못하므로
 * 그라데이션은 아래 맵에 완성 문자열로 둔다.
 */
const TYPE_CONFIG = {
  ONLINE: { label: '온라인', thumb: 'bg-gradient-to-br from-brand to-accent' },
  OFFLINE: { label: '오프라인', thumb: 'bg-gradient-to-br from-orange to-red' },
  BLEND: { label: '혼합', thumb: 'bg-gradient-to-br from-green to-accent' },
};

export default function CourseCard({ rec, onClick }) {
  const cfg = TYPE_CONFIG[rec.courseType] ?? TYPE_CONFIG.ONLINE;
  const pct = Math.round((rec.confidence ?? 0) * 100);

  return (
    <div className="w-full bg-white rounded-xl border border-mid-gray/30 overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      {/* 썸네일 */}
      <div className={`relative h-28 flex items-center justify-center ${cfg.thumb}`}>
        <BookOpen size={40} className="text-white/90" strokeWidth={1.6} />
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-navy/85 text-white">
          {cfg.label}
        </span>
        <div className="absolute top-2 right-2">
          <StageBadge stage={rec.stage} />
        </div>
      </div>

      {/* 본문 */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-navy line-clamp-1">{rec.courseNm}</h3>

        <div className="space-y-1 text-[11px] text-text-gray">
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span className="line-clamp-1">{rec.venue}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            <span>{rec.sessionDate}</span>
          </div>
        </div>

        {/* 매칭도 */}
        <div className="mt-1">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-text-gray">매칭도</span>
            <span className="font-bold text-brand">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-light-gray overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onClick}
          className="mt-2 w-full py-2 rounded-lg text-xs font-bold text-white bg-brand hover:opacity-90 transition-opacity"
        >
          상세 보기
        </button>
      </div>
    </div>
  );
}
