import { useState } from "react";

export const NEWS_DATA = [
  {
    id: 1, category: "판결",
    title: "대법원, 전세사기 피해자 보호 위한 새 판결 기준 제시",
    summary: "대법원이 전세사기 피해자의 주거권 보호를 위해 임대인의 기망 행위 판단 기준을 명확히 하는 새로운 판결을 내렸습니다.",
    date: "2026-04-21", source: "법률신문", views: 3241,
  },
  {
    id: 2, category: "입법",
    title: "노동법 개정안 국회 통과 — 주 52시간 특례업종 축소",
    summary: "국회는 주 52시간 근로제 특례 업종을 기존 26개에서 11개로 줄이는 내용의 근로기준법 개정안을 의결했습니다.",
    date: "2026-04-20", source: "연합뉴스", views: 5817, img: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3, category: "행정",
    title: "법무부, 형사 공탁 제도 간소화 방안 마련",
    summary: "법무부가 형사 피해자 구제를 위한 공탁 제도를 간소화하고 피해자 접근성을 높이는 개선 방안을 발표했습니다.",
    date: "2026-04-19", source: "법률신문", views: 1892, img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4, category: "판결",
    title: "헌법재판소, 디지털 성범죄 처벌 규정 합헌 결정",
    summary: "헌법재판소는 불법 촬영물 유포 및 소지에 대한 가중 처벌 조항이 헌법에 위반되지 않는다고 결정했습니다.",
    date: "2026-04-18", source: "한국경제", views: 7423, img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5, category: "시사",
    title: "AI 생성 콘텐츠 저작권 분쟁, 법원 첫 판단 나와",
    summary: "AI가 생성한 이미지의 저작권 귀속 문제에 대해 법원이 처음으로 판단을 내렸으며 관련 법 개정 논의가 활발해지고 있습니다.",
    date: "2026-04-17", source: "매일경제", views: 9104, img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6, category: "입법",
    title: "개인정보보호법 2차 개정안 시행 — 처벌 기준 대폭 강화",
    summary: "개인정보 유출 시 과징금 상한을 매출액의 3%에서 5%로 상향하는 개정법이 이달부터 시행에 들어갔습니다.",
    date: "2026-04-16", source: "법률신문", views: 4230, img: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7, category: "행정",
    title: "법원행정처, 전자소송 시스템 전면 개편 예고",
    summary: "법원행정처가 현행 전자소송 시스템을 전면 개편해 사용자 편의성을 높이고 AI 문서 분석 기능을 도입한다고 발표했습니다.",
    date: "2026-04-15", source: "연합뉴스", views: 2180, img: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8, category: "판결",
    title: "플랫폼 노동자 산재 인정 범위 확대 판결",
    summary: "배달 플랫폼 종사자의 업무 중 사고에 대해 산업재해를 인정하는 법원 판결이 잇따르면서 관련 제도 개선이 촉구됩니다.",
    date: "2026-04-14", source: "한겨레", views: 6530, img: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9, category: "시사",
    title: "가상화폐 사기 특별단속반 출범, 피해 구제 나선다",
    summary: "최근 급증하는 가상화폐 관련 투자 사기에 대응하기 위해 검찰과 경찰이 합동 특별단속반을 구성했습니다.",
    date: "2026-04-13", source: "매일경제", views: 5320,
  },
  {
    id: 10, category: "판결",
    title: "자율주행차 사고 책임, 제조사 과실 일부 인정",
    summary: "자율주행 3단계 차량의 추돌 사고에서 운전자뿐만 아니라 제조사의 시스템 결함도 일부 인정된다는 첫 판결이 나왔습니다.",
    date: "2026-04-12", source: "한국경제", views: 8912,
  },
  {
    id: 11, category: "입법",
    title: "스토킹 처벌법 개정안 통과, 온라인 스토킹 처벌 강화",
    summary: "SNS와 메신저를 이용한 온라인 스토킹 행위를 명시적으로 처벌하고 피해자 보호 조치를 강화하는 개정안이 통과되었습니다.",
    date: "2026-04-10", source: "법률신문", views: 6100,
  },
  {
    id: 12, category: "행정",
    title: "공정위, 대형 이커머스 '갑질' 불공정 약관 시정 명령",
    summary: "공정거래위원회가 입점 업체에 일방적으로 불리한 조항을 둔 대형 이커머스 업체들에 약관 시정을 명령했습니다.",
    date: "2026-04-08", source: "연합뉴스", views: 4250,
  },
  {
    id: 13, category: "판결",
    title: "촉법소년 연령 하향 논란 속, 소년원 송치 판결 증가",
    summary: "촉법소년 기준 연령 하향에 대한 사회적 논의가 지속되는 가운데, 법원의 강도 높은 보호처분 판결이 늘어나고 있습니다.",
    date: "2026-04-05", source: "한겨레", views: 7800,
  },
  {
    id: 14, category: "시사",
    title: "중대재해처벌법 시행 4년, 산업현장 안전 의식 변화는?",
    summary: "중대재해처벌법 시행 4년을 맞아 산업 현장의 안전 지표를 점검하고 모호한 규정에 대한 법률적 가이드라인을 분석했습니다.",
    date: "2026-04-02", source: "법률신문", views: 3980,
  },
  {
    id: 15, category: "판결",
    title: "재건축 초과이익 환수제, 헌법재판소 합헌 결정",
    summary: "헌법재판소가 재건축 초과이익 환수에 관한 법률이 사유재산권을 침해하지 않는다며 재판관 전원일치 합헌 결정을 내렸습니다.",
    date: "2026-03-29", source: "한국경제", views: 9240,
  },
  {
    id: 16, category: "입법",
    title: "부동산 중개수수료 상한율 인하 법안 발의",
    summary: "주거비 부담 완화를 위해 주택 매매 및 임대차 계약 시 적용되는 중개수수료 법정 상한율을 대폭 낮추는 공인중개사법 개정안이 국회에 제출되었습니다.",
    date: "2026-03-25", source: "연합뉴스", views: 12500,
  },
  {
    id: 17, category: "시사",
    title: "늘어나는 '깡통전세' 우려, HUG 보증 심사 기준 대폭 강화",
    summary: "전세가율 하락으로 인한 보증금 미반환 사고를 막기 위해 주택도시보증공사(HUG)가 전세보증금 반환보증 가입 요건을 한층 깐깐하게 변경했습니다.",
    date: "2026-03-22", source: "매일경제", views: 8760,
  }
];

const CATEGORIES = ["전체", "판결", "입법", "행정", "시사"];

export const categoryColor = {
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
      <div style={{ position: "relative", width: "100%", marginBottom: "1.5rem" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="뉴스 검색..."
          style={{
            width: "100%", padding: "12px 14px 12px 42px",
            border: "1px solid #e5e7eb", borderRadius: 12,
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
