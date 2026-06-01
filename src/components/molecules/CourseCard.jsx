import { BookOpen, Calendar, MapPin } from 'lucide-react';
import StageBadge from './StageBadge';
import Badge from '../atoms/Badge';

/**
 * CourseCard — 추천 카드 1장.
 * props만으로 렌더하는 정적 컴포넌트 (Presentational).
 * 부모(RecommendationCarousel)가 데이터를 내려준다.
 */
const TYPE_LABEL = {
  ONLINE: { label: '온라인', tone: 'blue' },
  OFFLINE: { label: '오프라인', tone: 'orange' },
  BLEND: { label: '혼합', tone: 'green' },
};

export default function CourseCard({ rec, onClick }) {
  const type = TYPE_LABEL[rec.courseType] ?? TYPE_LABEL.ONLINE;
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-mid-gray/30 flex flex-col gap-2"
    >
      {/* 썸네일 영역 (이미지 도입 전 placeholder) */}
      <div className="w-full h-20 bg-light-gray rounded flex items-center justify-center relative">
        <BookOpen size={28} className="text-mid-gray" />
        <div className="absolute top-1.5 left-1.5">
          <StageBadge stage={rec.stage} />
        </div>
        <div className="absolute top-1.5 right-1.5">
          <Badge tone={type.tone}>{type.label}</Badge>
        </div>
      </div>

      {/* 제목 */}
      <h3 className="text-xs font-bold text-navy line-clamp-2 leading-snug">
        {rec.courseNm}
      </h3>

      {/* 메타 */}
      <div className="space-y-1 text-[10px] text-text-gray">
        <div className="flex items-center gap-1">
          <Calendar size={10} />
          <span>{rec.sessionDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={10} />
          <span className="line-clamp-1">{rec.venue}</span>
        </div>
      </div>
    </button>
  );
}
