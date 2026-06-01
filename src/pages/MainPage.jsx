import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/organisms/Header';
import RecommendationCarousel from '../components/organisms/RecommendationCarousel';
import CategoryCarousel from '../components/organisms/CategoryCarousel';
import ClickModal from '../components/organisms/ClickModal';
import SectionHeader from '../components/molecules/SectionHeader';
import { MOCK_RECOMMENDATIONS } from '../data/mockRecommendations';

/**
 * MainPage — 인증 후 진입 화면.
 *
 * 추천 캐러셀이 화면의 핵심 영역. 추천 데이터는 5주차에서 mock으로 시뮬레이트하고,
 * 6주차에 useQuery + GET /api/recommendation 으로 교체.
 */
export default function MainPage({ user, onLogout }) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [clickedRec, setClickedRec] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setRecommendations(MOCK_RECOMMENDATIONS);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    onLogout?.();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-light-gray animate-fade-in">
      <Header
        user={user}
        searchKeyword={searchKeyword}
        onSearchChange={(e) => setSearchKeyword(e.target.value)}
        onLogout={handleLogout}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SectionHeader
          title={`${user?.userNm ?? '회원'}님을 위한 추천 과정`}
          subtitle="관심 분야와 학습 이력을 바탕으로 추천드립니다"
          onMore={() => {}}
        />

        <RecommendationCarousel
          recommendations={recommendations}
          isLoading={isLoading}
          onCardClick={setClickedRec}
        />

        <CategoryCarousel />

        <footer className="mt-10 pt-4 border-t border-mid-gray text-center text-[10px] text-text-gray">
          © 2026 더존비앤씨티 · Education Business Unit
        </footer>
      </main>

      {clickedRec && (
        <ClickModal rec={clickedRec} onClose={() => setClickedRec(null)} />
      )}
    </div>
  );
}
