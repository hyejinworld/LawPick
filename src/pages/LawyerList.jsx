import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LAWYERS, REGIONS, SPECS } from "../data/lawyers";
import { useFavorites } from "../hooks/useFavorites";

function LawyerCard({ lawyer, isFav, onToggleFav }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      background: "#fff", border: `1px solid ${hovered ? "#93c5fd" : "#e5e7eb"}`,
      borderRadius: 14, padding: "1.2rem", display: "flex", flexDirection: "column", gap: 10,
      position: "relative", transition: "all 0.15s",
      transform: hovered ? "translateY(-3px)" : "none",
      boxShadow: hovered ? "0 8px 24px rgba(29,78,216,0.08)" : "none",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 찜 버튼 */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFav(lawyer.id); }}
        style={{
          position: "absolute", top: 12, right: 12,
          width: 32, height: 32, borderRadius: "50%",
          border: `1px solid ${isFav ? "#ef4444" : "#e5e7eb"}`,
          background: isFav ? "#fef2f2" : "#f9fafb",
          color: isFav ? "#ef4444" : "#9ca3af",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: 16, lineHeight: 1, transition: "all 0.15s",
        }}
      >
        {isFav ? "♥" : "♡"}
      </button>

      {/* 상단 */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <img
          src={lawyer.img}
          alt={lawyer.name}
          style={{
            width: 62, height: 62, borderRadius: "50%", objectFit: "cover",
            border: "2px solid #e5e7eb", flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            display: "inline-block", fontSize: 11, color: "#1d4ed8", background: "#eff6ff",
            padding: "2px 8px", borderRadius: 10, marginBottom: 5,
          }}>📍 {lawyer.region}</span>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{lawyer.name} 변호사</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>{lawyer.office} · {lawyer.exp}</div>
        </div>
      </div>

      {/* 태그 */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {lawyer.spec.map((s, i) => (
          <span key={s} style={{
            fontSize: 11, padding: "3px 9px", borderRadius: 10,
            background: i === 0 ? "#eff6ff" : "#f9fafb",
            color: i === 0 ? "#1e40af" : "#6b7280",
            border: `1px solid ${i === 0 ? "#bfdbfe" : "#e5e7eb"}`,
          }}>{s}</span>
        ))}
      </div>

      {/* 설명 */}
      <p style={{
        fontSize: 12.5, color: "#6b7280", lineHeight: 1.6,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        margin: 0,
      }}>{lawyer.desc}</p>

      {/* 푸터 */}
      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 9,
        display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 12, color: "#374151" }}>
          <span style={{ color: "#f59e0b" }}>★</span> {lawyer.rating.toFixed(1)}
          <span style={{ color: "#d1d5db" }}> ({lawyer.reviews})</span>
        </div>
        <Link
          to={`/lawyers/${lawyer.id}`}
          style={{
            fontSize: 12, padding: "5px 13px", borderRadius: 7,
            background: "#1d4ed8", color: "#fff", textDecoration: "none", fontWeight: 600,
          }}
        >
          상세보기
        </Link>
      </div>
    </div>
  );
}

export default function LawyerList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialSpec = params.get("spec") || "전체";

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("전체");
  const [spec, setSpec] = useState(initialSpec);
  const [sort, setSort] = useState("rating");
  const { favorites, toggleFav } = useFavorites();

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const s = p.get("spec");
    if (s) setSpec(s);
  }, [location.search]);

  const filtered = useMemo(() => {
    let list = LAWYERS.filter((l) => {
      const matchR = region === "전체" || l.region === region;
      const matchS = spec === "전체" || l.spec.includes(spec);
      const matchQ = !query || l.name.includes(query) || l.spec.some(s => s.includes(query)) || l.desc.includes(query);
      return matchR && matchS && matchQ;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") list = [...list].sort((a, b) => b.reviews - a.reviews);
    if (sort === "exp") {
      const getExp = (str) => parseInt(str.replace(/[^0-9]/g, "")) || 0;
      list = [...list].sort((a, b) => getExp(b.exp) - getExp(a.exp));
    }
    return list;
  }, [query, region, spec, sort]);

  const FilterBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{
      padding: "5px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
      border: `1px solid ${active ? "#1d4ed8" : "#e5e7eb"}`,
      background: active ? "#1d4ed8" : "#fff",
      color: active ? "#fff" : "#6b7280",
      transition: "all 0.15s",
      fontFamily: "inherit",
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 4rem",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" }}>

      {/* 헤더 */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 4 }}>변호사 목록</h1>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>전문 분야별로 검증된 변호사를 찾아보세요</p>
      </div>

      {/* 검색 + 정렬 */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="변호사 이름 또는 전문분야 검색..."
            style={{
              width: "100%", padding: "9px 12px 9px 36px",
              border: "1px solid #e5e7eb", borderRadius: 9,
              fontSize: 14, outline: "none", color: "#111827", fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          padding: "9px 12px", border: "1px solid #e5e7eb", borderRadius: 9,
          fontSize: 14, color: "#374151", background: "#fff", cursor: "pointer",
          fontFamily: "inherit",
        }}>
          <option value="rating">평점순</option>
          <option value="reviews">리뷰순</option>
          <option value="exp">경력순</option>
        </select>
        {favorites.size > 0 && (
          <span style={{ background: "#fef2f2", color: "#dc2626", borderRadius: 10, padding: "4px 12px", fontSize: 13, fontWeight: 500 }}>
            ♥ 찜 {favorites.size}
          </span>
        )}
      </div>

      {/* 지역 필터 */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "0.5rem" }}>
        {REGIONS.map(r => <FilterBtn key={r} label={r} active={region === r} onClick={() => setRegion(r)} />)}
      </div>

      {/* 전문분야 필터 */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.2rem" }}>
        {SPECS.map(s => <FilterBtn key={s} label={s} active={spec === s} onClick={() => setSpec(s)} />)}
      </div>

      {/* 결과 수 */}
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: "1rem" }}>
        총 <strong style={{ color: "#111827" }}>{filtered.length}</strong>명의 변호사
      </p>

      {/* 카드 그리드 */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af", fontSize: 15 }}>
          검색 결과가 없습니다
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {filtered.map(l => (
            <LawyerCard key={l.id} lawyer={l} isFav={favorites.has(l.id)} onToggleFav={toggleFav} />
          ))}
        </div>
      )}
    </div>
  );
}
