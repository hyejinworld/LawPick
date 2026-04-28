import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import LawyerList from "./pages/LawyerList";
import LawyerDetail from "./pages/LawyerDetail";
import ChatBot from "./pages/ChatBot";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/lawyers" element={<LawyerList />} />
            <Route path="/lawyers/:id" element={<LawyerDetail />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
