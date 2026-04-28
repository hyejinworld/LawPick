import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export function useFavorites() {
  const { currentUser } = useAuth();
  
  // 유저가 로그인한 경우 유저 고유 ID로, 비로그인 상태면 게스트로 저장
  const storageKey = currentUser ? `lawpick_favs_${currentUser.uid}` : "lawpick_favs_guest";

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // favorites나 storageKey가 바뀔 때마다 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...favorites]));
  }, [favorites, storageKey]);

  // 유저가 로그인/로그아웃하여 storageKey가 바뀔 때 상태 동기화
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setFavorites(saved ? new Set(JSON.parse(saved)) : new Set());
    } catch {
      setFavorites(new Set());
    }
  }, [storageKey]);

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return { favorites, toggleFav };
}
