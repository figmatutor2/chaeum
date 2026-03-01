"use client";

import { useState, useEffect, useCallback } from "react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 리다이렉트 로그인 결과 처리
    getRedirectResult(auth).catch(() => {
      // 리다이렉트 결과 없으면 무시
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      // 팝업 로그인 시도
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: unknown) {
      // 팝업 차단 시 리다이렉트 방식으로 전환
      const firebaseError = error as { code?: string };
      if (firebaseError.code === "auth/popup-blocked") {
        await signInWithRedirect(auth, googleProvider);
        return null;
      }
      console.error("Google 로그인 실패:", error);
      return null;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  }, []);

  return { user, loading, signInWithGoogle, signOut };
}
