import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import LawyerList from "./pages/LawyerList";
import LawyerDetail from "./pages/LawyerDetail";
import ChatBot from "./pages/ChatBot";
import NewsPage from "./pages/NewsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/lawyers" element={<LawyerList />} />
          <Route path="/lawyers/:id" element={<LawyerDetail />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
