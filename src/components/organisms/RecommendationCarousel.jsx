import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from '../molecules/CourseCard';

/**
 * RecommendationCarousel — 추천 카드 N개를 좌우 스와이프·화살표로 탐색.
 * 모바일은 native 스와이프, 데스크탑은 좌우 화살표 클릭으로 scrollBy.
 *
 * 실제 데이터 fetch는 부모(MainPage)가 담당하고, 여기선 props.recommendations만 받아 렌더.
 */
export default function RecommendationCarousel({ recommendations, isLoading, onCardClick }) {
  const scrollRef = useRef(null);

  const scrollByPage = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scrollByPage(-1)}
        aria-label="이전 추천"
        className="absolute z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow text-navy"
        style={{ left: -14, top: 88 }}
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>
      <button
        onClick={() => scrollByPage(1)}
        aria-label="다음 추천"
        className="absolute z-10 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow text-navy"
        style={{ right: -14, top: 88 }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-3">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white rounded-lg p-3 animate-pulse"
                  style={{ width: 192, height: 208, scrollSnapAlign: 'start' }}
                >
                  <div className="w-full h-20 bg-light-gray rounded mb-3" />
                  <div className="w-3/4 h-3 bg-light-gray rounded mb-2" />
                  <div className="w-1/2 h-3 bg-light-gray rounded" />
                </div>
              ))
            : recommendations.map((rec) => (
                <div
                  key={rec.recId}
                  className="flex-shrink-0"
                  style={{ width: 192, scrollSnapAlign: 'start' }}
                >
                  <CourseCard rec={rec} onClick={() => onCardClick?.(rec)} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
