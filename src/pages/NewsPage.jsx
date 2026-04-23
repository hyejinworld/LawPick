import { useState } from "react";

const NEWS_DATA = [
  {
    id: 1, category: "판결",
    title: "대법원, 전세사기 피해자 보호 위한 새 판결 기준 제시",
    summary: "대법원이 전세사기 피해자의 주거권 보호를 위해 임대인의 기망 행위 판단 기준을 명확히 하는 새로운 판결을 내렸습니다.",
    date: "2024-04-21", source: "법률신문", views: 3241,
  },
  {
    id: 2, category: "입법",
    title: "노동법 개정안 국회 통과 — 주 52시간 특례업종 축소",
    summary: "국회는 주 52시간 근로제 특례 업종을 기존 26개에서 11개로 줄이는 내용의 근로기준법 개정안을 의결했습니다.",
    date: "2024-04-20", source: "연합뉴스", views: 5817, img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3, category: "행정",
    title: "법무부, 형사 공탁 제도 간소화 방안 마련",
    summary: "법무부가 형사 피해자 구제를 위한 공탁 제도를 간소화하고 피해자 접근성을 높이는 개선 방안을 발표했습니다.",
    date: "2024-04-19", source: "법률신문", views: 1892, img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4, category: "판결",
    title: "헌법재판소, 디지털 성범죄 처벌 규정 합헌 결정",
    summary: "헌법재판소는 불법 촬영물 유포 및 소지에 대한 가중 처벌 조항이 헌법에 위반되지 않는다고 결정했습니다.",
    date: "2024-04-18", source: "한국경제", views: 7423, img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5, category: "시사",
    title: "AI 생성 콘텐츠 저작권 분쟁, 법원 첫 판단 나와",
    summary: "AI가 생성한 이미지의 저작권 귀속 문제에 대해 법원이 처음으로 판단을 내렸으며 관련 법 개정 논의가 활발해지고 있습니다.",
    date: "2024-04-17", source: "매일경제", views: 9104, img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6, category: "입법",
    title: "개인정보보호법 2차 개정안 시행 — 처벌 기준 대폭 강화",
    summary: "개인정보 유출 시 과징금 상한을 매출액의 3%에서 5%로 상향하는 개정법이 이달부터 시행에 들어갔습니다.",
    date: "2024-04-16", source: "법률신문", views: 4230, img: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7, category: "행정",
    title: "법원행정처, 전자소송 시스템 전면 개편 예고",
    summary: "법원행정처가 현행 전자소송 시스템을 전면 개편해 사용자 편의성을 높이고 AI 문서 분석 기능을 도입한다고 발표했습니다.",
    date: "2024-04-15", source: "연합뉴스", views: 2180, img: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8, category: "판결",
    title: "플랫폼 노동자 산재 인정 범위 확대 판결",
    summary: "배달 플랫폼 종사자의 업무 중 사고에 대해 산업재해를 인정하는 법원 판결이 잇따르면서 관련 제도 개선이 촉구됩니다.",
    date: "2024-04-14", source: "한겨레", views: 6530, img: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

const CATEGORIES = ["전체", "판결", "입법", "행정", "시사"];

const categoryColor = {
  판결: { bg: "#eff6ff", color: "#1e40af" },
  입법: { bg: "#f0fdf4", color: "#166534" },
  행정: { bg: "#fef3c7", color: "#92400e" },
  시사: { bg: "#fdf2f8", color: "#9d174d" },
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [query, setQuery] = useState("");

  const filtered = NEWS_DATA.filter(n => {
    const matchC = activeCategory === "전체" || n.category === activeCategory;
    const matchQ = !query || n.title.includes(query) || n.summary.includes(query);
    return matchC && matchQ;
  });

  return (
    <div style={{
      maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem 4rem",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif"
    }}>

      {/* 헤더 */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 4 }}>법률 뉴스</h1>
        <p style={{ fontSize: 14, color: "#9ca3af" }}>최신 법률 판결, 입법, 행정 소식을 빠르게 확인하세요</p>
      </div>

      {/* 검색 */}
      <div style={{ position: "relative", maxWidth: 420, marginBottom: "1rem" }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="뉴스 검색..."
          style={{
            width: "100%", padding: "9px 12px 9px 36px",
            border: "1px solid #e5e7eb", borderRadius: 9,
            fontSize: 14, outline: "none", color: "#111827", fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* 카테고리 필터 */}
      <div style={{ display: "flex", gap: 6, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: "5px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer",
            border: `1px solid ${activeCategory === c ? "#1d4ed8" : "#e5e7eb"}`,
            background: activeCategory === c ? "#1d4ed8" : "#fff",
            color: activeCategory === c ? "#fff" : "#6b7280",
            transition: "all 0.15s", fontFamily: "inherit",
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(n => {
          const cc = categoryColor[n.category] || { bg: "#f3f4f6", color: "#374151" };
          return (
            <div key={n.id} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14,
              padding: "1.2rem 1.4rem",
              display: "flex", gap: 16, alignItems: "flex-start",
              cursor: "pointer", transition: "all 0.15s",
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
              {/* <img
                src={n.img}
                alt=""
                style={{ width: 72, height: 72, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
              /> */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: 11, padding: "2px 9px", borderRadius: 10,
                    background: cc.bg, color: cc.color, fontWeight: 600,
                  }}>{n.category}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{n.source}</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>·</span>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>{n.date}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6, lineHeight: 1.4 }}>
                  {n.title}
                </h3>
                <p style={{
                  fontSize: 13, color: "#6b7280", lineHeight: 1.6,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                  margin: 0
                }}>
                  {n.summary}
                </p>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
                  👁 {n.views.toLocaleString()}회
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem", color: "#9ca3af", fontSize: 15 }}>
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
