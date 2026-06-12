import { Calendar, MapPin, Star, Users } from 'lucide-react';
import StageBadge from './StageBadge';
import InstructorAvatar from '../atoms/InstructorAvatar';

/**
 * CourseCard — 추천 카드 1장.
 *
 * 썸네일을 강화: 유형별 컬러 배경 + 과목 "도서 표지" 모티프(책등/제목 띠) 위에
 * 강사 일러스트 아바타를 얹어 과목·강사를 한눈에 구분하게 한다.
 * 본문에는 강사명·평점·수강생 수를 노출한다.
 *
 * NOTE: Tailwind는 런타임 조합 클래스를 인식하지 못하므로
 * 그라데이션은 완성 문자열로 둔다.
 */
const TYPE_CONFIG = {
  ONLINE: { label: '온라인', thumb: 'bg-gradient-to-br from-brand to-accent', spine: '#0B5FAE' },
  OFFLINE: { label: '오프라인', thumb: 'bg-gradient-to-br from-orange to-red', spine: '#EA7317' },
  BLEND: { label: '혼합', thumb: 'bg-gradient-to-br from-green to-accent', spine: '#2E8B57' },
};

export default function CourseCard({ rec, onClick }) {
  const cfg = TYPE_CONFIG[rec.courseType] ?? TYPE_CONFIG.ONLINE;
  const pct = Math.round((rec.confidence ?? 0) * 100);
  const ins = rec.instructor;

  return (
    <div className="w-full bg-white rounded-xl border border-mid-gray/30 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
      {/* 썸네일: 도서 표지 모티프 + 강사 아바타 */}
      <div className={`relative h-36 overflow-hidden ${cfg.thumb}`}>
        {/* 책등 */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25" />
        <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/30" />
        {/* 장식 원 */}
        <div className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-white/10" />

        {/* 상단 뱃지 행 */}
        <div className="absolute top-2 left-5 right-2 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy/85 text-white">
            {cfg.label}
          </span>
          <StageBadge stage={rec.stage} />
        </div>

        {/* 과목 제목 띠 (도서 표지 느낌) */}
        <div className="absolute left-5 right-3 top-9">
          <div className="inline-block px-2 py-0.5 rounded bg-white/90 text-[10px] font-bold text-navy max-w-full truncate">
            {rec.courseNm}
          </div>
        </div>

        {/* 강사 아바타 */}
        {ins && (
          <div className="absolute left-5 bottom-3 flex items-center gap-2">
            <div className="shadow-md rounded-full">
              <InstructorAvatar seed={ins.avatarSeed} size={46} />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-bold text-white drop-shadow">{ins.name} {ins.title}</div>
              <div className="text-[9px] text-white/85 drop-shadow">{ins.expertise}</div>
            </div>
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-navy line-clamp-1">{rec.courseNm}</h3>

        {/* 강사 지표 */}
        {ins && (
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-orange font-bold">
              <Star size={12} fill="currentColor" strokeWidth={0} />
              {ins.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1 text-text-gray">
              <Users size={12} />
              {(rec.enrolledCount ?? 0).toLocaleString()}명
            </span>
          </div>
        )}

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
