import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LAWYERS } from "../data/lawyers";
import { NEWS_DATA, categoryColor } from "./NewsPage";
import { useReviews } from "../hooks/useReviews";

function LawyerMiniCard({ lawyer }) {
  return (
    <Link
      to={`/lawyers/${lawyer.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: "1.2rem",
        display: "flex", flexDirection: "column", gap: 10,
        cursor: "pointer",
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(29,78,216,0.10)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={lawyer.img}
            alt={lawyer.name}
            style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb" }}
          />
          <div>
            <div style={{ fontSize: 11, color: "#1d4ed8", background: "#eff6ff", padding: "2px 8px", borderRadius: 10, display: "inline-block", marginBottom: 4 }}>
              📍 {lawyer.region}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{lawyer.name} 변호사</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{lawyer.exp}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {lawyer.spec.map((s, i) => (
            <span key={s} style={{
              fontSize: 11, padding: "3px 9px", borderRadius: 10,
              background: i === 0 ? "#eff6ff" : "#f9fafb",
              color: i === 0 ? "#1e40af" : "#6b7280",
              border: `1px solid ${i === 0 ? "#bfdbfe" : "#e5e7eb"}`,
            }}>{s}</span>
          ))}
        </div>
        <div style={{
          fontSize: 12.5, color: "#6b7280", lineHeight: 1.6,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          {lawyer.desc}
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: "1px solid #f3f4f6", paddingTop: 9
        }}>
          <span style={{ fontSize: 12, color: "#f59e0b" }}>
            {"★".repeat(Math.floor(lawyer.rating))} <span style={{ color: "#374151" }}>{lawyer.rating.toFixed(1)}</span>
            <span style={{ color: "#d1d5db" }}> ({lawyer.reviews})</span>
          </span>
          <span style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>상세보기 →</span>
        </div>
      </div>
    </Link>
  );
}

// ── 애니메이션 숫자 카운터 ──────────────────────────────────
function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ── 히어로 섹션 ────────────────────────────────────────────
function HeroSection() {
  const navigate = useNavigate();
  const [hoverCta, setHoverCta] = useState(null);

  const cards = [
    {
      accent: "#185FA5",
      bg: "#E6F1FB",
      tag: "비용 절감",
      title: "1차 법률 자문,\nAI가 무료로 해결",
      desc: "변호사 선임 전 AI가 먼저 상황을 분석해 방향을 잡아드립니다. 불필요한 상담 비용을 줄이세요.",
      stat: "0원",
      statLabel: "AI 상담 비용",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="#185FA5" strokeWidth="1.5" />
          <path d="M11 7v4.5l3 3" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7.5 11h2" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      accent: "#0F6E56",
      bg: "#E1F5EE",
      tag: "스마트 비교",
      title: "변호사를\n나란히 비교",
      desc: "경력·전문분야·평점·상담료를 한눈에 비교해 나에게 딱 맞는 변호사를 찾을 수 있습니다.",
      stat: "3명",
      statLabel: "동시 비교 가능",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="5" width="8" height="12" rx="1.5" stroke="#0F6E56" strokeWidth="1.5" />
          <rect x="12" y="5" width="8" height="12" rx="1.5" stroke="#0F6E56" strokeWidth="1.5" />
          <path d="M10 11h2" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      accent: "#854F0B",
      bg: "#FAEEDA",
      tag: "누구나 무료",
      title: "법 몰라도\n걱정 없어요",
      desc: "법률 용어를 몰라도 괜찮습니다. 일상 언어로 물어보면 쉽게 풀어서 24시간 답변해드립니다.",
      stat: "24h",
      statLabel: "무료 이용",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 3C7.13 3 4 6.13 4 10c0 2.5 1.28 4.7 3.22 6H11h3.78C16.72 14.7 18 12.5 18 10c0-3.87-3.13-7-7-7Z" stroke="#854F0B" strokeWidth="1.5" />
          <path d="M8 19h6M11 16v3" stroke="#854F0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section style={{
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      padding: "4rem 1.5rem 3rem",
      maxWidth: 1080,
      margin: "0 auto",
    }}>
      {/* 배지 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#EFF6FF", border: "1px solid #BFDBFE",
          borderRadius: 999, padding: "5px 14px",
          fontSize: 12, color: "#185FA5", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#185FA5">
            <circle cx="5" cy="5" r="5" />
          </svg>
          법제처 국가법령정보 공식 연동
        </span>
      </div>

      {/* 메인 헤드라인 */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 46px)",
          fontWeight: 800, color: "#0f172a",
          lineHeight: 1.25, marginBottom: "1rem",
          letterSpacing: "-0.02em",
        }}>
          법률 문제,{" "}
          <span style={{
            position: "relative", display: "inline-block",
          }}>
            <span style={{
              position: "relative", zIndex: 1,
              background: "linear-gradient(90deg, #185FA5, #0F6E56)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              혼자서도 해결
            </span>
            <svg style={{
              position: "absolute", bottom: -4, left: 0, width: "100%",
            }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
              <path d="M0 5 Q100 0 200 5" stroke="#185FA5" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
            </svg>
          </span>
          할 수 있습니다
        </h1>
        <p style={{
          fontSize: 16, color: "#64748b", lineHeight: 1.8,
          maxWidth: 520, margin: "0 auto",
        }}>
          변호사 선임 전 AI가 먼저 길을 열어드립니다.<br />
          법률 전문 지식 없이도 누구나 무료로 이용 가능합니다.
        </p>
      </div>

      {/* 3가지 핵심 카드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16, marginBottom: "2.5rem",
      }}>
        {cards.map((card) => (
          <div key={card.tag} style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: "1.5rem",
            borderTop: `3px solid ${card.accent}`,
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "default",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 32px -8px ${card.accent}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* 아이콘 + 태그 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: card.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {card.icon}
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, color: card.accent,
                background: card.bg, borderRadius: 999,
                padding: "3px 10px", letterSpacing: "0.04em",
              }}>
                {card.tag}
              </span>
            </div>

            {/* 제목 */}
            <h3 style={{
              fontSize: 18, fontWeight: 800, color: "#0f172a",
              lineHeight: 1.4, marginBottom: "0.65rem",
              whiteSpace: "pre-line",
            }}>
              {card.title}
            </h3>

            {/* 설명 */}
            <p style={{
              fontSize: 13.5, color: "#64748b", lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}>
              {card.desc}
            </p>

            {/* 통계 */}
            <div style={{
              borderTop: "1px solid #f1f5f9",
              paddingTop: "1rem",
              display: "flex", alignItems: "baseline", gap: 6,
            }}>
              <span style={{
                fontSize: 26, fontWeight: 800, color: card.accent,
                letterSpacing: "-0.02em",
              }}>
                {card.stat}
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>{card.statLabel}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 수치 통계 바 */}
      <div style={{
        background: "#0f172a",
        borderRadius: 16, padding: "1.5rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12, marginBottom: "2.5rem",
      }}>
        {[
          { value: 1200, suffix: "+", label: "누적 AI 상담 건수" },
          { value: 98, suffix: "%", label: "사용자 만족도" },
          { value: 340, suffix: "+", label: "등록 변호사 수" },
          { value: 0, suffix: "원", label: "기본 상담 비용" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 26, fontWeight: 800, color: "#f8fafc",
              letterSpacing: "-0.02em", lineHeight: 1,
            }}>
              <CountUp target={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA 버튼 */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/chat")}
          onMouseEnter={() => setHoverCta("ai")}
          onMouseLeave={() => setHoverCta(null)}
          style={{
            padding: "14px 32px", borderRadius: 12, border: "none",
            background: hoverCta === "ai" ? "#0C447C" : "#185FA5",
            color: "#fff", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.15s, transform 0.15s",
            transform: hoverCta === "ai" ? "translateY(-1px)" : "none",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
            <path d="M5 8h6M9 6l2 2-2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          AI 법률 상담 시작하기 — 무료
        </button>
        <button
          onClick={() => navigate("/lawyers")}
          onMouseEnter={() => setHoverCta("lawyer")}
          onMouseLeave={() => setHoverCta(null)}
          style={{
            padding: "14px 32px", borderRadius: 12,
            border: "1.5px solid #e2e8f0",
            background: hoverCta === "lawyer" ? "#f8fafc" : "#fff",
            color: "#0f172a", fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.15s, transform 0.15s",
            transform: hoverCta === "lawyer" ? "translateY(-1px)" : "none",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="6" r="3" stroke="#0f172a" strokeWidth="1.5" />
            <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          변호사 비교하러 가기
        </button>
      </div>

      {/* 신뢰 문구 */}
      <p style={{
        textAlign: "center", fontSize: 12, color: "#94a3b8",
        marginTop: "1.25rem",
      }}>
        회원가입 없이 · 카드 등록 없이 · 지금 바로 이용 가능
      </p>
    </section>
  );
}

export default function MainPage() {
  const featured = LAWYERS.slice(0, 8);

  const { getRecentReviews } = useReviews();
  const [recentReviews, setRecentReviews] = useState([]);

  useEffect(() => {
    getRecentReviews().then(setRecentReviews);
  }, []);

  const top5Lawyers = [...LAWYERS].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>

      <HeroSection />

      {/* 카테고리 섹션 */}
      <section style={{ background: "#f8fafc", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 8 }}>전문분야별 변호사</h2>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: "1.5rem" }}>분야를 선택하면 전문 변호사를 바로 찾을 수 있습니다</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
            {[
              { label: "민사", icon: "⚖️" },
              { label: "형사", icon: "🔍" },
              { label: "가사", icon: "👨‍👩‍👧" },
              { label: "부동산", icon: "🏠" },
              { label: "노동", icon: "💼" },
              { label: "기업", icon: "🏢" },
              { label: "상속", icon: "📜" },
              { label: "의료", icon: "🏥" },
              { label: "IT", icon: "💻" },
              { label: "교통사고", icon: "🚗" },
            ].map(({ label, icon }) => (
              <Link
                key={label}
                to={`/lawyers?spec=${label}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20,
                  padding: "1.2rem 1rem", textAlign: "center", cursor: "pointer",
                  transition: "all 0.15s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "#1d4ed8";
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 사용자 댓글 & 평점 TOP 3 변호사 (2단 배치) */}
      <section style={{ background: "#f8fafc", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          
          {/* 왼쪽: 최신 사용자 댓글 5개 */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>최신 사용자 리뷰</h2>
            </div>
            {recentReviews.length === 0 ? (
              <div style={{ fontSize: 14, color: "#6b7280", padding: "2rem", textAlign: "center", background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
                아직 등록된 리뷰가 없습니다.
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {recentReviews.map(r => {
                  const lawyer = LAWYERS.find(l => l.id === r.lawyerId);
                  return (
                    <div key={r.id} style={{
                      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "0 1.2rem",
                      display: "flex", flexDirection: "column", justifyContent: "center", gap: 6,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                      height: 74, boxSizing: "border-box"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Link to={`/lawyers/${r.lawyerId}`} style={{ fontWeight: 700, fontSize: 14, color: "#111827", textDecoration: "none" }}>
                            {lawyer ? `${lawyer.name} 변호사` : "변호사 리뷰"}
                          </Link>
                          <div style={{ fontSize: 12, color: "#f59e0b" }}>
                            {"★".repeat(r.rating)}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>
                          {r.createdAt ? new Date(r.createdAt.toMillis()).toLocaleDateString() : '방금 전'}
                        </div>
                      </div>
                      <p style={{ 
                        fontSize: 13, color: "#374151", margin: 0, 
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" 
                      }}>
                        {r.content}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 오른쪽: 평점 TOP 5 변호사 */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>평점 TOP 5 변호사</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {top5Lawyers.map((l, idx) => (
                <div key={l.id} style={{
                  background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "0 1.2rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  height: 74, boxSizing: "border-box"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ 
                      fontSize: 14, fontWeight: 800, color: idx < 3 ? "#1d4ed8" : "#9ca3af", width: 16, textAlign: "center" 
                    }}>
                      {idx + 1}
                    </div>
                    <img src={l.img} alt={l.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <Link to={`/lawyers/${l.id}`} style={{ fontWeight: 700, fontSize: 14, color: "#111827", textDecoration: "none" }}>
                        {l.name} 변호사
                      </Link>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>
                        {l.spec.slice(0, 2).join(" · ")}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 12, color: "#f59e0b", marginBottom: 2, fontWeight: 600 }}>
                      ★ {l.rating.toFixed(1)}
                    </div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>
                      리뷰 {l.reviews}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 추천 변호사 */}
      <section style={{ background: "#fff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 4 }}>추천 변호사</h2>
              <p style={{ fontSize: 14, color: "#6b7280" }}>높은 평점과 풍부한 경험을 가진 변호사를 만나보세요</p>
            </div>
            <Link to="/lawyers" style={{ fontSize: 14, color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}>
              전체 보기 →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {featured.map(l => <LawyerMiniCard key={l.id} lawyer={l} />)}
          </div>
        </div>
      </section>

      {/* 최신법률동향 */}
      <section style={{ background: "#f8fafc", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 4 }}>최신법률동향</h2>
              <p style={{ fontSize: 14, color: "#6b7280" }}>최근 주요 판결과 법률 트렌드를 확인하세요</p>
            </div>
            <Link to="/news" style={{ fontSize: 14, color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}>
              뉴스 더보기 →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 16 }}>
            {NEWS_DATA.slice(0, 4).map(n => {
              const cc = categoryColor[n.category] || { bg: "#f3f4f6", color: "#374151" };
              return (
                <div key={n.id} style={{
                  background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
                  padding: "1.2rem 1.4rem", cursor: "pointer", transition: "all 0.15s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "#93c5fd";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, padding: "2px 9px", borderRadius: 10, background: cc.bg, color: cc.color, fontWeight: 600 }}>
                      {n.category}
                    </span>
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6, lineHeight: 1.4 }}>
                    {n.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 }}>
                    {n.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI 상담 CTA */}
      <section style={{
        background: "#111827",
        padding: "4rem 1.5rem",
        textAlign: "center",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🤖</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>AI 법률 상담 서비스</h2>
          <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7, marginBottom: 28 }}>
            법제처 공식 법령 데이터 기반의 Lawpick AI가 24시간 법률 질문에 답변해 드립니다. <br />
            복잡한 법률 용어도 쉽게 설명해 드려요.
          </p>
          <Link to="/chat" style={{
            padding: "13px 32px", background: "#1d4ed8", color: "#fff",
            borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none",
          }}>
            지금 바로 질문하기 →
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <footer style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#1d4ed8", marginBottom: 8 }}>
          Law<span style={{ color: "#111827" }}>pick</span>
        </div>
        <p style={{ fontSize: 11, color: "#9ca3af" }}>
          © 2026 Lawpick. AI 법률 서비스 플랫폼. 법적 효력이 있는 정식 법률 자문은 담당 변호사에게 문의하세요.<br />

          개인정보보호책임자: 오혜진 <br />
          통신판매업신고: 2026-경기도성남시분당구-1234号 <br />
          사업자등록번호: 123-45-67890 <br />
          사업장소재지: 경기도 성남시 분당구 정자동 123<br />
          E-mail : lawpick.law.0612@gmail.com <br />
          고객센터: 1234-5678
          팩스: 031-1234-5678
          COPYRIGHT ⓒ 2026 Lawpick ALL RIGHTS RESERVED.

        </p>
      </footer>
    </div>
  );
}
