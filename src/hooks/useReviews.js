import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function useReviews() {
  const { currentUser } = useAuth();

  // 특정 변호사의 리뷰 가져오기
  const getLawyerReviews = async (lawyerId) => {
    try {
      const q = query(
        collection(db, "reviews"),
        where("lawyerId", "==", lawyerId)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Firestore 복합 인덱스 오류를 피하기 위해 메모리에서 정렬 (최신순)
      return data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
    } catch (e) {
      console.error("리뷰 가져오기 실패", e);
      return [];
    }
  };

  // 전체 최신 리뷰 5개 가져오기
  const getRecentReviews = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reviews"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // 메모리에서 최신순 정렬 후 5개만 추출
      return data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      }).slice(0, 5);
    } catch (e) {
      console.error("최신 리뷰 가져오기 실패", e);
      return [];
    }
  };

  // 내가 작성한 리뷰 가져오기
  const getMyReviews = async () => {
    if (!currentUser) return [];
    try {
      const q = query(
        collection(db, "reviews"),
        where("userId", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      return data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeB - timeA;
      });
    } catch (e) {
      console.error("내 리뷰 가져오기 실패", e);
      return [];
    }
  };

  // 새 리뷰 추가하기
  const addReview = async (lawyerId, rating, content) => {
    if (!currentUser) throw new Error("로그인이 필요합니다.");
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        lawyerId,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        rating,
        content,
        createdAt: serverTimestamp()
      });
      return { id: docRef.id };
    } catch (e) {
      console.error("리뷰 추가 실패", e);
      throw e;
    }
  };

  // 리뷰 삭제하기
  const deleteReview = async (reviewId) => {
    if (!currentUser) throw new Error("로그인이 필요합니다.");
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
    } catch (e) {
      console.error("리뷰 삭제 실패", e);
      throw e;
    }
  };

  return { getLawyerReviews, getMyReviews, getRecentReviews, addReview, deleteReview };
}
