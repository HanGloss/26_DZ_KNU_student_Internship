import { X, Calendar, MapPin, Clock, Sparkles } from 'lucide-react';

/**
 * ClickModal — 추천 카드 클릭 시 표시되는 상세 모달.
 * 6주차에 /courses/:id 라우팅이 도입되면 모달 대신 페이지 전환으로 교체.
 */
export default function ClickModal({ rec, onClose }) {
  if (!rec) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-base font-bold text-navy">{rec.courseNm}</h3>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1 -m-1 rounded hover:bg-light-gray"
          >
            <X size={16} className="text-text-gray" />
          </button>
        </div>

        <div className="rounded-lg p-3 mb-3 border-l-4 border-brand bg-pale-blue">
          <div className="text-[10px] font-bold mb-1 flex items-center gap-1 text-brand">
            <Sparkles size={11} /> 추천 이유
          </div>
          <div className="text-xs text-navy leading-relaxed">{rec.reason}</div>
        </div>

        <div className="space-y-2 mb-4 text-xs">
          <MetaRow icon={Calendar} label="일정" value={rec.sessionDate} />
          <MetaRow icon={MapPin} label="장소" value={rec.venue} />
          <MetaRow icon={Clock} label="학습량" value={rec.duration} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded text-xs font-bold border border-mid-gray text-text-gray hover:bg-light-gray"
          >
            닫기
          </button>
          <button className="flex-1 py-2 rounded text-xs font-bold text-white bg-brand hover:opacity-90">
            수강 신청하기
          </button>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-text-gray" />
      <span className="text-text-gray">{label}</span>
      <span className="font-semibold text-navy">{value}</span>
    </div>
  );
}
