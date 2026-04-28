import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { LAWYERS } from "../data/lawyers";

export default function MyPage() {
  const { currentUser } = useAuth();
  const { favorites, toggleFav } = useFavorites();
  
  // 전체 변호사 데이터에서 찜한(id가 favorites에 있는) 변호사만 필터링
  const favoriteLawyers = LAWYERS.filter(l => favorites.has(l.id));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem", fontFamily: "'Noto Sans KR', sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: "2rem" }}>
        {currentUser ? (
          <><span style={{ color: "#1d4ed8" }}>{currentUser.email}</span>님의 마이페이지</>
        ) : (
          "마이페이지"
        )}
      </h1>
      
      <div style={{ borderBottom: "2px solid #111827", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>
          내가 찜한 변호사 <span style={{ color: "#1d4ed8" }}>{favoriteLawyers.length}</span>명
        </h2>
      </div>
      
      {favoriteLawyers.length === 0 ? (
        <div style={{ 
          padding: "4rem 2rem", textAlign: "center", background: "#f8fafc", 
          borderRadius: 12, border: "1px dashed #cbd5e1" 
        }}>
          <div style={{ fontSize: 40, marginBottom: "1rem" }}>📭</div>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: "1.5rem" }}>
            아직 찜한 변호사가 없습니다.<br/>
            마음에 드는 변호사를 찾아 하트(♥)를 눌러보세요!
          </p>
          <Link to="/lawyers" style={{ 
            display: "inline-block", padding: "10px 24px", background: "#1d4ed8", 
            color: "#fff", borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: "none" 
          }}>
            변호사 찾아보기
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {favoriteLawyers.map(lawyer => (
            <div key={lawyer.id} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.2rem",
              position: "relative", display: "flex", flexDirection: "column", gap: 10,
              boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}>
              <button
                onClick={() => toggleFav(lawyer.id)}
                style={{
                  position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid #ef4444", background: "#fef2f2", color: "#ef4444",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16
                }}
              >
                ♥
              </button>
              
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <img src={lawyer.img} alt={lawyer.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid #e5e7eb" }} />
                <div>
                  <div style={{ fontSize: 11, color: "#1d4ed8", background: "#eff6ff", padding: "2px 8px", borderRadius: 10, display: "inline-block", marginBottom: 5 }}>📍 {lawyer.region}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{lawyer.name} 변호사</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{lawyer.office}</div>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                {lawyer.spec.slice(0, 3).map((s, i) => (
                  <span key={s} style={{ 
                    fontSize: 11, padding: "3px 9px", borderRadius: 10, 
                    background: i === 0 ? "#eff6ff" : "#f9fafb", 
                    color: i === 0 ? "#1e40af" : "#6b7280", 
                    border: `1px solid ${i === 0 ? "#bfdbfe" : "#e5e7eb"}` 
                  }}>{s}</span>
                ))}
              </div>
              
              <Link to={`/lawyers/${lawyer.id}`} style={{ 
                marginTop: "auto", textAlign: "center", padding: "8px", 
                background: "#f8fafc", borderRadius: 8, fontSize: 13, 
                color: "#374151", textDecoration: "none", fontWeight: 600,
                border: "1px solid #e5e7eb"
              }}>
                상세보기
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
