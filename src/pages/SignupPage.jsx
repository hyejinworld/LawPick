import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("비밀번호가 일치하지 않습니다.");
    }
    
    if (password.length < 6) {
      return setError("비밀번호는 최소 6자리 이상이어야 합니다.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/"); // 회원가입 완료 후 메인 페이지로 이동
    } catch (err) {
      setError("회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.");
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
        회원가입
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
            placeholder="6자리 이상 입력해주세요"
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 6 }}>비밀번호 확인</label>
          <input
            type="password"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            style={{
              width: "100%", padding: "0.75rem", borderRadius: 8,
              border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box"
            }}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
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
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: 14, color: "#6b7280" }}>
        이미 계정이 있으신가요?{" "}
        <Link to="/login" style={{ color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>
          로그인
        </Link>
      </div>
    </div>
  );
}
