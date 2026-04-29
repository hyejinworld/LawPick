import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFavorites } from "../hooks/useFavorites";
import { useReviews } from "../hooks/useReviews";
import { useChatHistory } from "../hooks/useChatHistory";
import { LAWYERS } from "../data/lawyers";

// ── 공유 스타일 상수 ──────────────────────────────────────────
const BLUE = "#1d4ed8";
const font = "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif";

// ── localStorage 키 ──────────────────────────────────────────
const COMPARE_KEY = "lawpick_compare_list";

const loadJson = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
};

// ── 탭 버튼 ──────────────────────────────────────────────────
function Tab({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer",
        fontFamily: font, fontSize: 14, fontWeight: active ? 700 : 500,
        background: active ? BLUE : "transparent",
        color: active ? "#fff" : "#6b7280",
        transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6,
      }}
    >
      {label}
      {count !== undefined && count > 0 && (
        <span style={{
          background: active ? "rgba(255,255,255,0.3)" : "#e5e7eb",
          color: active ? "#fff" : "#374151",
          borderRadius: 20, padding: "1px 8px", fontSize: 11, fontWeight: 700,
        }}>{count}</span>
      )}
    </button>
  );
}

// ── 섹션 카드 ─────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 14, padding: "1.2rem",
      ...style,
    }}>{children}</div>
  );
}

// ═══════════════════════════════════════════════════════════
// 탭 1: 찜 목록
// ═══════════════════════════════════════════════════════════
function WishList({ wishList, toggleFav }) {
  const [compareList, setCompareList] = useState(() => loadJson(COMPARE_KEY));

  const toggleCompare = (lawyer) => {
    setCompareList((prev) => {
      const exists = prev.find((l) => l.id === lawyer.id);
      let next;
      if (exists) {
        next = prev.filter((l) => l.id !== lawyer.id);
      } else {
        if (prev.length >= 3) {
          alert("최대 3명까지 비교할 수 있습니다.");
          return prev;
        }
        next = [...prev, lawyer];
      }
      localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (wishList.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🤍</div>
        <p style={{ fontSize: 15 }}>찜한 변호사가 없습니다</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>변호사 목록에서 ♥ 버튼을 눌러 추가해보세요</p>
      </div>
    );
  }

  return (
    <div>
      {compareList.length > 0 && (
        <div style={{
          marginBottom: 16, padding: "10px 14px", borderRadius: 10,
          background: "#eff6ff", border: "1px solid #bfdbfe",
          fontSize: 13, color: BLUE, fontWeight: 600,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span>📊 비교 선택됨: {compareList.map((l) => l.name).join(", ")}</span>
          <span style={{ color: "#6b7280", fontWeight: 400 }}>마이페이지 → 변호사 비교 탭에서 확인</span>
        </div>
      )}
      <div style={{ display: "grid", gap: 12 }}>
        {wishList.map((lawyer) => {
          const inCompare = compareList.find((l) => l.id === lawyer.id);
          return (
            <Card key={lawyer.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Link to={`/lawyers/${lawyer.id}`}>
                <img src={lawyer.img} alt={lawyer.name} style={{
                  width: 52, height: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid #e5e7eb"
                }}/>
              </Link>
              <div style={{ flex: 1 }}>
                <Link to={`/lawyers/${lawyer.id}`} style={{ fontWeight: 700, fontSize: 15, color: "#111827", textDecoration: "none" }}>{lawyer.name} 변호사</Link>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                  {lawyer.spec.join(" · ")} · {lawyer.exp}
                </div>
                <div style={{ fontSize: 12, color: "#f59e0b", marginTop: 2 }}>
                  ★ {lawyer.rating.toFixed(1)} ({lawyer.reviews}개 리뷰)
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => toggleCompare(lawyer)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${inCompare ? BLUE : "#e5e7eb"}`,
                    background: inCompare ? "#eff6ff" : "#fff",
                    color: inCompare ? BLUE : "#6b7280",
                    cursor: "pointer", fontFamily: font,
                  }}
                >
                  {inCompare ? "✓ 비교중" : "+ 비교"}
                </button>
                <button
                  onClick={() => toggleFav(lawyer.id)}
                  style={{
                    padding: "6px 12px", borderRadius: 8, fontSize: 12,
                    border: "1px solid #fee2e2", background: "#fff",
                    color: "#ef4444", cursor: "pointer", fontFamily: font,
                  }}
                >
                  찜 해제
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 탭 2: 리뷰 목록
// ═══════════════════════════════════════════════════════════
function ReviewList({ reviews, deleteReview }) {
  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
        <p style={{ fontSize: 15 }}>작성한 리뷰가 없습니다</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {reviews.map((review) => {
        const lawyer = LAWYERS.find(l => l.id === review.lawyerId);
        return (
          <Card key={review.id}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Link to={`/lawyers/${review.lawyerId}`} style={{ fontWeight: 700, color: "#111827", textDecoration: "none" }}>
                  {lawyer ? `${lawyer.name} 변호사` : "알 수 없는 변호사"}
                </Link>
                <span style={{ fontSize: 13, color: "#f59e0b" }}>
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#9ca3af" }}>
                  {review.createdAt ? new Date(review.createdAt.toMillis()).toLocaleDateString() : '방금 전'}
                </span>
                <button
                  onClick={() => deleteReview(review.id)}
                  style={{
                    background: "none", border: "none", color: "#ef4444", fontSize: 12,
                    cursor: "pointer", padding: 0, textDecoration: "underline"
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0 }}>{review.content}</p>
          </Card>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 탭 3: AI 상담 히스토리
// ═══════════════════════════════════════════════════════════
function ChatHistory({ history, deleteSession }) {
  const [selected, setSelected] = useState(null);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteSession(id);
    if (selected?.id === id) setSelected(null);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  if (history.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
        <p style={{ fontSize: 15 }}>저장된 상담 기록이 없습니다</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>AI 법률 상담을 이용하면 자동으로 저장됩니다</p>
        <Link to="/chat" style={{ color: BLUE, fontWeight: 600, textDecoration: "none", display: "inline-block", marginTop: 12 }}>
          AI 상담 시작하기 →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "280px 1fr" : "1fr", gap: 16 }}>
      {/* 목록 */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>총 {history.length}개 대화</span>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {history.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelected(selected?.id === session.id ? null : session)}
              style={{
                padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                border: `1px solid ${selected?.id === session.id ? BLUE : "#e5e7eb"}`,
                background: selected?.id === session.id ? "#eff6ff" : "#fff",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 600, color: "#111827",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    💬 {session.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
                    {formatDate(session.date)} · {session.messages.length - 1}개 대화
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(session.id, e)}
                  style={{ fontSize: 16, color: "#d1d5db", background: "none", border: "none", cursor: "pointer", padding: "0 0 0 8px", flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 뷰어 */}
      {selected && (
        <Card style={{ maxHeight: 520, overflowY: "auto", padding: "1.5rem", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, marginBottom: 14, borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
              📋 {selected.title}
            </div>
            <button 
              onClick={() => setSelected(null)}
              style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af", padding: "0 4px", lineHeight: 1 }}
              title="닫기"
            >
              ×
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {selected.messages.slice(1).map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div key={i} style={{
                  display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    maxWidth: "85%", padding: "12px 16px",
                    borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                    background: isUser ? "#eff6ff" : "#f3f4f6",
                    color: "#111827",
                    fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
                  }}>
                    <div style={{ fontSize: 11, color: isUser ? BLUE : "#6b7280", marginBottom: 4, fontWeight: 700 }}>
                      {isUser ? "나" : "AI"}
                    </div>
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 탭 4: 변호사 비교
// ═══════════════════════════════════════════════════════════
const COMPARE_FIELDS = [
  { label: "전문 분야", key: "spec" },
  { label: "경력", key: "exp" },
  { label: "평점", key: "rating", prefix: "★ " },
  { label: "리뷰 수", key: "reviews", suffix: "개" },
  { label: "위치", key: "region" },
];

function LawyerCompare() {
  const [compareList, setCompareList] = useState(() => loadJson(COMPARE_KEY));

  const removeFromCompare = (id) => {
    const next = compareList.filter((l) => l.id !== id);
    setCompareList(next);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(next));
  };

  const clearAll = () => {
    setCompareList([]);
    localStorage.removeItem(COMPARE_KEY);
  };

  if (compareList.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "#9ca3af" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
        <p style={{ fontSize: 15 }}>비교할 변호사를 선택해주세요</p>
        <p style={{ fontSize: 13, marginTop: 4 }}>찜 목록에서 "+ 비교" 버튼으로 최대 3명까지 선택 가능합니다</p>
      </div>
    );
  }

  // 최고 평점, 최다 리뷰 하이라이트
  const maxRating = Math.max(...compareList.map((l) => parseFloat(l.rating) || 0));
  const maxReviews = Math.max(...compareList.map((l) => parseInt(l.reviews) || 0));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 13, color: "#6b7280" }}>{compareList.length}명 비교 중</span>
        <button
          onClick={clearAll}
          style={{ fontSize: 12, color: "#ef4444", background: "none", border: "none", cursor: "pointer" }}
        >
          전체 초기화
        </button>
      </div>

      {/* 비교 테이블 */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
          <thead>
            <tr>
              <th style={{
                width: 120, padding: "12px 14px", textAlign: "left",
                fontSize: 13, color: "#6b7280", fontWeight: 600,
                borderBottom: "2px solid #e5e7eb", background: "#f8fafc",
                borderRadius: "10px 0 0 0",
              }}>항목</th>
              {compareList.map((lawyer) => (
                <th key={lawyer.id} style={{
                  padding: "12px 14px", textAlign: "center",
                  borderBottom: "2px solid #e5e7eb", background: "#f8fafc",
                  minWidth: 160,
                }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <img src={lawyer.img} alt={lawyer.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb" }} />
                    <Link to={`/lawyers/${lawyer.id}`} style={{ fontWeight: 700, fontSize: 14, color: "#111827", textDecoration: "none" }}>{lawyer.name} 변호사</Link>
                    <button
                      onClick={() => removeFromCompare(lawyer.id)}
                      style={{
                        fontSize: 11, color: "#9ca3af", background: "none",
                        border: "1px solid #e5e7eb", borderRadius: 6,
                        padding: "2px 8px", cursor: "pointer",
                      }}
                    >
                      제거
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_FIELDS.map((field, fi) => (
              <tr key={field.key} style={{ background: fi % 2 === 0 ? "#fff" : "#f8fafc" }}>
                <td style={{
                  padding: "12px 14px", fontSize: 13, fontWeight: 600,
                  color: "#374151", borderBottom: "1px solid #f3f4f6",
                }}>
                  {field.label}
                </td>
                {compareList.map((lawyer) => {
                  const val = lawyer[field.key];
                  const displayVal = Array.isArray(val) ? val.join(" · ") : val;
                  const isTopRating = field.key === "rating" && parseFloat(val) === maxRating && compareList.length > 1;
                  const isTopReview = field.key === "reviews" && parseInt(val) === maxReviews && compareList.length > 1;
                  const highlight = isTopRating || isTopReview;

                  return (
                    <td key={lawyer.id} style={{
                      padding: "12px 14px", textAlign: "center",
                      fontSize: 14, borderBottom: "1px solid #f3f4f6",
                      color: highlight ? BLUE : "#111827",
                      fontWeight: highlight ? 700 : 400,
                      background: highlight ? "#eff6ff" : "transparent",
                    }}>
                      {displayVal ? `${field.prefix || ""}${typeof displayVal === 'number' && field.key==='rating' ? displayVal.toFixed(1) : displayVal}${field.suffix || ""}` : (
                        <span style={{ color: "#d1d5db" }}>-</span>
                      )}
                      {highlight && <span style={{ marginLeft: 4, fontSize: 12 }}>👑</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 요약 추천 */}
      {compareList.length > 1 && (
        <Card style={{ marginTop: 16, background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#166534", marginBottom: 8 }}>
            ✅ AI 비교 요약
          </div>
          <p style={{ fontSize: 13, color: "#166534", lineHeight: 1.7 }}>
            {compareList.find((l) => parseFloat(l.rating) === maxRating)?.name}님이 평점 {maxRating.toFixed(1)}점으로 가장 높은 평가를 받고 있습니다.
            {compareList.length >= 2 && ` 리뷰 수는 ${compareList.find((l) => parseInt(l.reviews) === maxReviews)?.name}님이 ${maxReviews}개로 가장 많습니다.`}
            최종 선택은 전문 분야와 위치를 함께 고려해보세요.
          </p>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 메인 MyPage
// ═══════════════════════════════════════════════════════════
export default function MyPage() {
  const { currentUser } = useAuth();
  const { favorites, toggleFav } = useFavorites();
  const { getMyReviews, deleteReview } = useReviews();
  const { getHistory, deleteSession } = useChatHistory();

  const [activeTab, setActiveTab] = useState("wish");
  const [myReviews, setMyReviews] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getMyReviews().then(setMyReviews);
      setChatHistory(getHistory());
    }
  }, [currentUser, getHistory, getMyReviews]);

  const handleDeleteReview = async (id) => {
    if(!window.confirm("이 리뷰를 삭제하시겠습니까?")) return;
    await deleteReview(id);
    getMyReviews().then(setMyReviews);
  };

  const handleDeleteSession = (id) => {
    if(!window.confirm("이 상담 기록을 삭제하시겠습니까?")) return;
    deleteSession(id);
    setChatHistory(getHistory());
  };

  if (!currentUser) return null;

  const wishListLawyers = LAWYERS.filter(l => favorites.has(l.id));

  const wishCount = wishListLawyers.length;
  const reviewCount = myReviews.length;
  const historyCount = chatHistory.length;
  const compareCount = loadJson(COMPARE_KEY).length;

  const TABS = [
    { id: "wish", label: "찜 목록", count: wishCount },
    { id: "review", label: "리뷰 목록", count: reviewCount },
    { id: "history", label: "AI 상담 기록", count: historyCount },
    { id: "compare", label: "변호사 비교", count: compareCount },
  ];

  return (
    <div style={{
      maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem",
      fontFamily: font, minHeight: "100vh",
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 4 }}>
          👤 <span style={{ color: BLUE }}>{currentUser.email}</span>님의 마이페이지
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>나의 활동 내역을 확인하세요</p>
      </div>

      {/* 탭 */}
      <div style={{
        display: "flex", gap: 4, marginBottom: "1.5rem",
        background: "#f3f4f6", borderRadius: 12, padding: 4,
        overflowX: "auto",
      }}>
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            count={tab.count}
          />
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "wish" && <WishList wishList={wishListLawyers} toggleFav={toggleFav} />}
      {activeTab === "review" && <ReviewList reviews={myReviews} deleteReview={handleDeleteReview} />}
      {activeTab === "history" && <ChatHistory history={chatHistory} deleteSession={handleDeleteSession} />}
      {activeTab === "compare" && <LawyerCompare />}
    </div>
  );
}
