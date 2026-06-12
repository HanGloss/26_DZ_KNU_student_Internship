import { useState } from 'react';
import {
  X, Calendar, MapPin, Clock, CheckCircle2,
  History, Tag, TrendingUp, GitBranch, Award, Star, Users,
} from 'lucide-react';
import StageBadge from '../molecules/StageBadge';
import InstructorAvatar from '../atoms/InstructorAvatar';

/**
 * ClickModal — 추천 카드 클릭 시 상세 모달.
 * 매칭도 바 + "어느 부분에서 매칭됐는지" 근거(matchFactors)를 보여준다.
 * "수강 신청하기"는 DB 없이 완료(mock) 상태로 전환.
 */
const FACTOR_CONFIG = {
  history: { label: '학습 이력', Icon: History, cls: 'bg-pale-blue text-brand' },
  interest: { label: '관심 분야', Icon: Tag, cls: 'bg-pale-orange text-orange' },
  level: { label: '역량 단계', Icon: TrendingUp, cls: 'bg-pale-green text-green' },
  trend: { label: '학습 흐름', Icon: GitBranch, cls: 'bg-pale-purple text-navy' },
  instructor: { label: '인기 강사', Icon: Award, cls: 'bg-pale-red text-red' },
};

export default function ClickModal({ rec, onClose }) {
  const [applied, setApplied] = useState(false);
  if (!rec) return null;

  const pct = Math.round((rec.confidence ?? 0) * 100);
  const factors = rec.matchFactors ?? [];

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
        {applied ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-14 h-14 rounded-full bg-pale-green flex items-center justify-center mb-3">
              <CheckCircle2 size={30} className="text-green" />
            </div>
            <h3 className="text-base font-bold text-navy mb-1">수강 신청 완료</h3>
            <p className="text-xs text-text-gray leading-relaxed mb-5">
              <span className="font-semibold text-navy">{rec.courseNm}</span>
              <br />
              신청이 접수되었습니다. 마이페이지에서 확인하실 수 있어요.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 rounded text-xs font-bold text-white bg-brand hover:opacity-90"
            >
              확인
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-navy">{rec.courseNm}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="닫기"
                className="p-1 -m-1 rounded hover:bg-light-gray"
              >
                <X size={16} className="text-text-gray" />
              </button>
            </div>

            {/* 매칭도 */}
            <div className="rounded-lg p-3 mb-3 bg-light-gray">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <StageBadge stage={rec.stage} />
                  <span className="text-[11px] text-text-gray">로 추천된 과정</span>
                </div>
                <span className="text-lg font-extrabold text-brand leading-none">{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-[10px] text-text-gray mt-1">나와의 매칭도</div>
            </div>

            {/* 강사 프로필 */}
            {rec.instructor && (
              <div className="flex items-center gap-3 rounded-lg p-3 mb-3 border border-mid-gray/30">
                <div className="shrink-0 rounded-full shadow-sm">
                  <InstructorAvatar seed={rec.instructor.avatarSeed} size={48} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-navy">{rec.instructor.name}</span>
                    <span className="text-[11px] text-text-gray">{rec.instructor.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] mt-0.5">
                    <span className="flex items-center gap-1 text-orange font-bold">
                      <Star size={12} fill="currentColor" strokeWidth={0} />
                      {rec.instructor.rating.toFixed(1)}
                    </span>
                    <span className="flex items-center gap-1 text-text-gray">
                      <Users size={12} />
                      후기 {rec.instructor.reviewCount.toLocaleString()}건
                    </span>
                  </div>
                  <p className="text-[10px] text-text-gray mt-1 line-clamp-2">{rec.instructor.bio}</p>
                </div>
              </div>
            )}

            {/* 매칭 근거 */}
            {factors.length > 0 && (
              <div className="mb-3">
                <div className="text-[11px] font-bold text-navy mb-2">이런 점에서 추천해요</div>
                <div className="space-y-1.5">
                  {factors.map((f, i) => {
                    const c = FACTOR_CONFIG[f.kind] ?? FACTOR_CONFIG.history;
                    const { label, Icon, cls } = c;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${cls}`}>
                          <Icon size={11} />
                          {label}
                        </span>
                        <span className="text-xs text-navy">{f.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 메타 */}
            <div className="space-y-2 mb-4 text-xs border-t border-mid-gray/30 pt-3">
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
              <button
                onClick={() => setApplied(true)}
                className="flex-1 py-2 rounded text-xs font-bold text-white bg-brand hover:opacity-90"
              >
                수강 신청하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-text-gray" />
      <span className="text-text-gray w-10">{label}</span>
      <span className="font-semibold text-navy">{value}</span>
    </div>
  );
}
