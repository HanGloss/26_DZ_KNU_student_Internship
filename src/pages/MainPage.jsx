import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchX, Flame, Briefcase } from 'lucide-react';

import Header from '../components/organisms/Header';
import RecommendationCarousel from '../components/organisms/RecommendationCarousel';
import RelatedRail from '../components/organisms/RelatedRail';
import CategoryCarousel from '../components/organisms/CategoryCarousel';
import ClickModal from '../components/organisms/ClickModal';
import SectionHeader from '../components/molecules/SectionHeader';
import { useToast } from '../components/feedback/Toast';
import { MOCK_RECOMMENDATIONS, enrichRecommendations } from '../data/mockRecommendations';

/**
 * MainPage — 인증 후 진입 화면.
 *
 * 추천 캐러셀이 화면의 핵심 영역. 추천 데이터는 5주차에서 mock으로 시뮬레이트하고,
 * 6주차에 useQuery + GET /api/recommendation 으로 교체.
 *
 * 검색어·카테고리는 mock 데이터를 클라이언트에서 필터링한다(DB 없이 동작).
 */
export default function MainPage({ user, onLogout }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [clickedRec, setClickedRec] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setRecommendations(enrichRecommendations(MOCK_RECOMMENDATIONS));
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  // 검색어 + 카테고리로 필터링 후, 매칭도(confidence) 내림차순 정렬
  const filtered = useMemo(() => {
    const kw = searchKeyword.trim();
    return recommendations
      .filter((rec) => {
        const haystack = `${rec.courseNm} ${rec.venue} ${rec.reason}`;
        const matchKw = !kw || haystack.includes(kw);
        const matchCat = !activeCategory || haystack.includes(activeCategory);
        return matchKw && matchCat;
      })
      .sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0));
  }, [recommendations, searchKeyword, activeCategory]);

  // 이주의 인기 강의: 수강생 수 상위 → 강사 인기 보조 정렬
  const popularRail = useMemo(
    () =>
      [...recommendations]
        .sort(
          (a, b) =>
            (b.enrolledCount ?? 0) - (a.enrolledCount ?? 0) ||
            (b.instructor?.popularity ?? 0) - (a.instructor?.popularity ?? 0),
        )
        .slice(0, 4),
    [recommendations],
  );

  // 같은 직무 동료가 듣는 강의: 세무/회계 직무 가정 — 오프라인·실무 비중 높은 과정 우선
  const peerRail = useMemo(
    () =>
      [...recommendations]
        .filter((r) => r.courseType !== 'ONLINE')
        .sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0))
        .slice(0, 4),
    [recommendations],
  );

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  const handleShowAll = () => {
    setSearchKeyword('');
    setActiveCategory(null);
    toast(`추천 과정 ${recommendations.length}개를 모두 표시합니다`);
  };

  const isFiltering = searchKeyword.trim() || activeCategory;

  return (
    <div className="min-h-screen bg-light-gray animate-fade-in">
      <Header
        user={user}
        searchKeyword={searchKeyword}
        onSearchChange={(e) => setSearchKeyword(e.target.value)}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <CategoryCarousel active={activeCategory} onSelect={setActiveCategory} />

        <SectionHeader
          title={`${user?.userNm ?? '회원'}님을 위한 추천 과정`}
          subtitle={
            isFiltering
              ? `검색 결과 ${filtered.length}건`
              : '관심 분야와 학습 이력을 바탕으로 추천드립니다'
          }
          onMore={handleShowAll}
        />

        {!isLoading && filtered.length === 0 ? (
          <div className="bg-white rounded-lg border border-mid-gray/30 py-12 flex flex-col items-center gap-2 text-text-gray">
            <SearchX size={28} className="text-mid-gray" />
            <p className="text-sm">조건에 맞는 과정이 없습니다</p>
            <button
              onClick={handleShowAll}
              className="mt-1 text-xs font-semibold text-brand hover:underline"
            >
              전체 과정 보기
            </button>
          </div>
        ) : (
          <RecommendationCarousel
            recommendations={filtered}
            isLoading={isLoading}
            onCardClick={setClickedRec}
          />
        )}

        {!isFiltering && !isLoading && (
          <>
            <RelatedRail
              icon={Flame}
              title="이주의 인기 강의"
              subtitle="가장 많은 수강생이 선택한 과정"
              accentCls="bg-pale-orange text-orange"
              items={popularRail}
              onCardClick={setClickedRec}
            />
            <RelatedRail
              icon={Briefcase}
              title={`${user?.companyNm ?? '세무·회계'} 직무 동료가 듣는 강의`}
              subtitle="같은 직무에서 많이 수강하는 실무 과정"
              accentCls="bg-pale-blue text-brand"
              items={peerRail}
              onCardClick={setClickedRec}
            />
          </>
        )}

        <footer className="mt-10 pt-4 border-t border-mid-gray text-center text-[10px] text-text-gray">
          © 2026 재경 링크 · 학습용 프로토타입 (비공식)
        </footer>
      </main>

      {clickedRec && (
        <ClickModal rec={clickedRec} onClose={() => setClickedRec(null)} />
      )}
    </div>
  );
}
