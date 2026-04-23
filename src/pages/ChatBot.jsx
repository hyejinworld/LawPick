import { useState, useRef, useEffect } from "react";

const QUICK_QUESTIONS = [
  "임대차 계약 시 주의사항이 궁금해요",
  "부당해고를 당했는데 어떻게 해야 하나요?",
  "이혼 시 재산분할은 어떻게 되나요?",
  "교통사고 합의금 계산 방법은?",
  "상속 포기는 어떻게 신청하나요?",
  "소액 사건 심판 절차가 궁금해요",
];

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12, gap: 8, alignItems: "flex-end",
    }}>
      {!isUser && (
        <div style={{
          width: 36, height: 36, borderRadius: "50%", background: "#1d4ed8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
        }}>⚖️</div>
      )}
      <div style={{
        maxWidth: "70%", padding: "10px 15px", borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
        background: isUser ? "#1d4ed8" : "#fff",
        color: isUser ? "#fff" : "#111827",
        border: isUser ? "none" : "1px solid #e5e7eb",
        fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
      }}>
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "안녕하세요! 저는 Lawpick AI 법률 상담 봇입니다 ⚖️\n\n법률 관련 궁금한 점을 자유롭게 질문해 주세요. 쉽고 명확하게 설명해 드리겠습니다.\n\n⚠️ 본 서비스는 일반적인 법률 정보 제공을 목적으로 하며, 정식 법률 자문을 대체하지 않습니다.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `당신은 Lawpick의 AI 법률 상담 봇입니다. 한국 법률 전문가로서 의뢰인에게 친절하고 명확하게 법률 정보를 제공합니다.
          
규칙:
- 항상 한국어로 답변합니다
- 쉽고 명확한 언어를 사용합니다
- 법적 조항이나 판례를 인용할 때는 출처를 밝힙니다
- 복잡한 사안은 전문 변호사 상담을 권유합니다
- 법률 정보를 제공하되, 정식 법률 자문을 대체하지 않음을 안내합니다
- 답변은 구조적으로 명확하게 작성합니다`,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "죄송합니다. 답변을 가져오지 못했습니다.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 2rem",
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      display: "flex", flexDirection: "column", height: "calc(100vh - 60px)",
    }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: 4 }}>
          🤖 AI 법률 상담
        </h1>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>
          법제처 법령 데이터 기반 · 24시간 무료 상담
        </p>
      </div>

      {/* 자주 묻는 질문 */}
      {messages.length <= 1 && (
        <div style={{ marginBottom: "1rem", flexShrink: 0 }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, fontWeight: 600 }}>자주 묻는 질문</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {QUICK_QUESTIONS.map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{
                padding: "6px 12px", borderRadius: 20,
                border: "1px solid #e5e7eb", background: "#fff",
                fontSize: 12, color: "#374151", cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1d4ed8"; e.currentTarget.style.color = "#1d4ed8"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#374151"; }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 메시지 영역 */}
      <div style={{
        flex: 1, overflowY: "auto", background: "#f8fafc",
        border: "1px solid #e5e7eb", borderRadius: 14,
        padding: "1.2rem", marginBottom: "1rem",
      }}>
        {messages.map((m, i) => <Message key={i} msg={m} />)}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#1d4ed8",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>⚖️</div>
            <div style={{
              padding: "10px 15px", borderRadius: "4px 16px 16px 16px",
              background: "#fff", border: "1px solid #e5e7eb", fontSize: 14,
            }}>
              <span style={{ color: "#9ca3af" }}>답변 작성 중</span>
              <span style={{ animation: "blink 1s infinite" }}>...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력창 */}
      <div style={{
        display: "flex", gap: 8, flexShrink: 0,
        background: "#fff", border: "1px solid #e5e7eb",
        borderRadius: 12, padding: "8px 12px",
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="법률 질문을 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
          rows={2}
          style={{
            flex: 1, border: "none", outline: "none", resize: "none",
            fontSize: 14, color: "#111827", fontFamily: "inherit",
            lineHeight: 1.6, background: "transparent",
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          style={{
            padding: "8px 16px", borderRadius: 8,
            background: input.trim() && !loading ? "#1d4ed8" : "#e5e7eb",
            color: input.trim() && !loading ? "#fff" : "#9ca3af",
            border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
            fontSize: 14, fontWeight: 700, fontFamily: "inherit",
            transition: "all 0.15s", alignSelf: "flex-end",
          }}
        >
          전송
        </button>
      </div>

      <p style={{ fontSize: 11, color: "#d1d5db", textAlign: "center", marginTop: 8 }}>
        본 AI 상담은 일반적인 법률 정보 제공 목적이며 정식 법률 자문을 대체하지 않습니다
      </p>
    </div>
  );
}
