import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{
      maxWidth: 400, margin: "4rem auto", padding: "2rem",
      background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 800, color: "#111827", marginBottom: "1.5rem" }}>
        로그인
      </h2>

      {error && (
        <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "0.75rem", borderRadius: 8, marginBottom: "1rem", fontSize: 14 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "0.75rem", borderRadius: 8,
              border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box"
            }}
            placeholder="example@email.com"
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>비밀번호</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "0.75rem", borderRadius: 8,
              border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box"
            }}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          style={{
            width: "100%", padding: "0.875rem", background: "#1d4ed8", color: "#fff",
            borderRadius: 8, fontSize: 16, fontWeight: 700, border: "none",
            cursor: loading ? "not-allowed" : "pointer", marginTop: 8,
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: 14, color: "#6b7280" }}>
        계정이 없으신가요?{" "}
        <Link to="/signup" style={{ color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
