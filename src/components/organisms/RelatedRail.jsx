import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from '../molecules/CourseCard';

/**
 * RelatedRail — "이주의 인기 강의", "같은 직무 동료가 듣는 강의" 등
 * 연관 추천을 가로 스크롤 레일로 보여주는 경량 캐러셀.
 * RecommendationCarousel과 달리 로딩 스켈레톤이 없고, 강조 아이콘/색을 받는다.
 */
export default function RelatedRail({ icon: Icon, title, subtitle, accentCls, items, onCardClick }) {
  const scrollRef = useRef(null);
  const scrollByPage = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };
  if (!items?.length) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${accentCls}`}>
          {Icon && <Icon size={16} />}
        </span>
        <div>
          <h2 className="text-base font-bold text-navy leading-tight">{title}</h2>
          {subtitle && <p className="text-[11px] text-text-gray">{subtitle}</p>}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scrollByPage(-1)}
          aria-label="이전"
          className="absolute z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow text-navy"
          style={{ left: -12, top: 96 }}
        >
          <ChevronLeft size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => scrollByPage(1)}
          aria-label="다음"
          className="absolute z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow text-navy"
          style={{ right: -12, top: 96 }}
        >
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-3">
            {items.map((rec) => (
              <div
                key={rec.recId}
                className="flex-shrink-0"
                style={{ width: 220, scrollSnapAlign: 'start' }}
              >
                <CourseCard rec={rec} onClick={() => onCardClick?.(rec)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
