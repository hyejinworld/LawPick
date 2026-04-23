import { useParams, Link } from "react-router-dom";
import { LAWYERS } from "../data/lawyers";
import { useState } from "react";

export default function LawyerDetail() {
  const { id } = useParams();
  const lawyer = LAWYERS.find(l => l.id === Number(id));
  const [isFav, setIsFav] = useState(false);

  if (!lawyer) {
    return (
      <div style={{ textAlign: "center", padding: "5rem", fontFamily: "inherit" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>😢</div>
        <p style={{ color: "#6b7280" }}>변호사 정보를 찾을 수 없습니다</p>
        <Link to="/lawyers" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}>← 목록으로</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem 5rem",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* 뒤로가기 */}
      <Link to="/lawyers" style={{ fontSize: 14, color: "#1d4ed8", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: "1.5rem" }}>
        ← 변호사 목록으로
      </Link>

      {/* 프로필 카드 */}
      <div style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16,
        padding: "2rem", marginBottom: "1.5rem",
        display: "flex", gap: 28, flexWrap: "wrap",
      }}>
        {/* 사진 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <img
            src={lawyer.img}
            alt={lawyer.name}
            style={{
              width: 120, height: 120, borderRadius: "50%", objectFit: "cover",
              border: "3px solid #e5e7eb",
            }}
          />
          <button
            onClick={() => setIsFav(!isFav)}
            style={{
              padding: "6px 18px", borderRadius: 20,
              border: `1px solid ${isFav ? "#ef4444" : "#e5e7eb"}`,
              background: isFav ? "#fef2f2" : "#fff",
              color: isFav ? "#ef4444" : "#6b7280",
              cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit",
            }}
          >
            {isFav ? "♥ 찜됨" : "♡ 찜하기"}
          </button>
        </div>

        {/* 정보 */}
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#1d4ed8", background: "#eff6ff", padding: "2px 10px", borderRadius: 10 }}>
              📍 {lawyer.region}
            </span>
            <span style={{ fontSize: 11, color: "#059669", background: "#ecfdf5", padding: "2px 10px", borderRadius: 10 }}>
              {lawyer.fee}
            </span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 4 }}>
            {lawyer.name} {lawyer.title}
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 12 }}>{lawyer.office} · {lawyer.exp}</p>

          {/* 전문분야 */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
            {lawyer.spec.map((s, i) => (
              <span key={s} style={{
                fontSize: 13, padding: "4px 12px", borderRadius: 20,
                background: i === 0 ? "#eff6ff" : "#f3f4f6",
                color: i === 0 ? "#1e40af" : "#374151",
                border: `1px solid ${i === 0 ? "#bfdbfe" : "#e5e7eb"}`,
                fontWeight: 600,
              }}>{s}</span>
            ))}
          </div>

          {/* 통계 */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1d4ed8" }}>{lawyer.rating.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>평점 ({lawyer.reviews}개)</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#059669" }}>{lawyer.wins}%</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>승소율</div>
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#374151" }}>{lawyer.cases.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>누적 사건</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16, alignItems: "start" }}>
        {/* 좌측: 상세 설명 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 12 }}>변호사 소개</h2>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8 }}>{lawyer.detail}</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 12 }}>주요 취급 분야</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {lawyer.spec.map(s => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1d4ed8", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#374151" }}>{s} 관련 소송 및 법률 자문</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 연락처 카드 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 14 }}>연락처 정보</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 16 }}>📞</span>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>전화번호</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{lawyer.phone}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 16 }}>📍</span>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>주소</div>
                  <div style={{ fontSize: 13, color: "#374151" }}>{lawyer.address}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 16 }}>💬</span>
                <div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>상담료</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#059669" }}>{lawyer.fee}</div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/chat" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", padding: "13px", background: "#1d4ed8", color: "#fff",
              border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              상담 신청하기
            </button>
          </Link>

          <button style={{
            width: "100%", padding: "12px", background: "#fff", color: "#1d4ed8",
            border: "1px solid #1d4ed8", borderRadius: 10, fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            ⭐ 리뷰 작성
          </button>
        </div>
      </div>

      {/* 다른 변호사 */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 14 }}>다른 변호사도 살펴보세요</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {LAWYERS.filter(l => l.id !== lawyer.id).slice(0, 4).map(l => (
            <Link key={l.id} to={`/lawyers/${l.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
                padding: "1rem", display: "flex", alignItems: "center", gap: 10,
                transition: "border-color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#93c5fd"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e5e7eb"}
              >
                <img src={l.img} alt={l.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{l.spec[0]} · {l.region}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
