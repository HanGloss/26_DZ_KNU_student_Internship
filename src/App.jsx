import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import AccountMergeNoticePage from './pages/AccountMergeNoticePage';
import TermsAgreementPage from './pages/TermsAgreementPage';
import TwoFactorAuthPage from './pages/TwoFactorAuthPage';
import MainPage from './pages/MainPage';

/**
 * App — 최상위 컴포넌트.
 *
 * user를 메모리에 보관하고 라우트별로 가드한다.
 * 새로고침 시 user가 날아가므로 6주차에 localStorage 또는 백엔드 세션으로 교체.
 *
 *   /login          → 공개
 *   /mergeNotice    → 인증 후, 통합 전
 *   /terms          → 인증 후, 통합 전
 *   /twoFactor      → 인증 후
 *   /main           → 인증 + 2FA 통과 후
 */
export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onAuthenticated={setUser} />} />
      <Route
        path="/mergeNotice"
        element={user ? <AccountMergeNoticePage user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/terms"
        element={user ? <TermsAgreementPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/twoFactor"
        element={user ? <TwoFactorAuthPage user={user} /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/main"
        element={
          user ? (
            <MainPage user={user} onLogout={() => setUser(null)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
