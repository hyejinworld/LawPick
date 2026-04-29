import { useAuth } from "../contexts/AuthContext";

export function useChatHistory() {
  const { currentUser } = useAuth();

  const getHistoryKey = () => {
    if (!currentUser) return null;
    return `lawpick_chat_history_${currentUser.uid}`;
  };

  const getHistory = () => {
    const key = getHistoryKey();
    if (!key) return [];
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  };

  const saveSession = (sessionId, messages) => {
    const key = getHistoryKey();
    if (!key || messages.length <= 1) return; // 로그인 안 되어 있거나 첫 인사만 있으면 저장 안 함

    const history = getHistory();
    const firstUserMsg = messages.find((m) => m.role === "user");
    
    let titleText = firstUserMsg?.content || "법률 상담";
    if (titleText.length > 30) titleText = titleText.slice(0, 30) + "...";

    const sessionData = {
      id: sessionId,
      date: new Date().toISOString(),
      title: titleText,
      messages,
    };

    const existingIndex = history.findIndex(s => s.id === sessionId);
    let updated;
    if (existingIndex >= 0) {
      updated = [...history];
      updated[existingIndex] = sessionData; // 기존 세션 덮어쓰기
    } else {
      updated = [sessionData, ...history].slice(0, 20); // 새 세션 추가 (최대 20개)
    }
    
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const deleteSession = (sessionId) => {
    const key = getHistoryKey();
    if (!key) return;
    const history = getHistory();
    const updated = history.filter(s => s.id !== sessionId);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return { getHistory, saveSession, deleteSession };
}
