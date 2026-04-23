import { Link } from "react-router-dom";
import { LAWYERS } from "../data/lawyers";

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

export default function MainPage() {
  const featured = LAWYERS.slice(0, 8);

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* 히어로 섹션 */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #3b82f6 100%)",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
        color: "#fff",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, color: "#93c5fd", marginBottom: 16 }}>
            AI 기반 법률 서비스 플랫폼
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.25, marginBottom: 20, letterSpacing: -1 }}>
            내게 맞는 변호사를<br />쉽고 빠르게 찾아보세요
          </h1>
          <p style={{ fontSize: 17, color: "#bfdbfe", lineHeight: 1.7, marginBottom: 36 }}>
            전문 변호사 찾기부터 AI 법률 상담까지<br />
            Lawpick이 여러분의 법률 문제를 도와드립니다
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/lawyers" style={{
              padding: "13px 30px", background: "#fff", color: "#1d4ed8",
              borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none",
            }}>
              변호사 찾기
            </Link>
            <Link to="/chat" style={{
              padding: "13px 30px", background: "rgba(255,255,255,0.15)", color: "#fff",
              borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.3)",
            }}>
              AI 법률 상담 →
            </Link>
          </div>
        </div>
      </section>

      {/* 통계 배너 */}
      <section style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24,
          textAlign: "center",
        }}>
          {[
            { num: "1,200+", label: "등록 변호사" },
            { num: "98%", label: "의뢰인 만족도" },
            { num: "24/7", label: "AI 상담 가능" },
            { num: "15,000+", label: "성공 사례" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1d4ed8" }}>{num}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

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

      {/* 추천 변호사 */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
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
            법제처 공식 법령 데이터 기반의 AI가 24시간 법률 질문에 답변해 드립니다.
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
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          © 2024 Lawpick. AI 법률 서비스 플랫폼. 법적 효력이 있는 정식 법률 자문은 담당 변호사에게 문의하세요.
        </p>
      </footer>
    </div>
  );
}
