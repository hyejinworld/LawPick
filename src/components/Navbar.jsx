import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  const links = [
    { to: "/lawyers", label: "변호사" },
    { to: "/chat", label: "오픈AI 챗봇" },
    { to: "/news", label: "법률뉴스" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#fff", borderBottom: "1px solid #e5e7eb",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        {/* 로고 */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1d4ed8", letterSpacing: -0.5 }}>
            Law<span style={{ color: "#111827" }}>pick</span>
          </span>
        </Link>

        {/* 네비게이션 */}
        <nav style={{ display: "flex", gap: 4 }}>
          {links.map(({ to, label }) => {
            const active = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: active ? 700 : 400,
                  color: active ? "#1d4ed8" : "#374151",
                  textDecoration: "none",
                  background: active ? "#eff6ff" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 버튼 */}
        <div style={{ display: "flex", gap: 8 }}>
          <Link
            to="/chat"
            style={{
              padding: "7px 18px",
              background: "#1d4ed8",
              color: "#fff",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  );
}
