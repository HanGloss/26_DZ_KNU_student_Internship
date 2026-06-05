import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Info } from 'lucide-react';

/**
 * Toast — 화면 하단 중앙에 잠깐 떴다 사라지는 알림.
 * DB 없이 "클릭이 동작함"을 사용자에게 즉시 피드백하는 용도.
 * useToast()로 어디서든 toast('메시지') 호출.
 *
 * 6주차에 실제 API가 붙으면, 여기에 성공/실패 토스트를 그대로 재사용.
 */
const ToastContext = createContext(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const toast = useCallback((message) => {
    const id = ++idRef.current;
    setToasts((list) => [...list, { id, message }]);
    setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, 2600);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 max-w-sm px-4 py-2.5 rounded-lg shadow-xl bg-navy text-white text-xs animate-fade-in"
          >
            <Info size={14} className="text-accent shrink-0" />
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
