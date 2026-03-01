"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { UserProfile } from "@/lib/types";
import { User } from "firebase/auth";

interface ProfileModalProps {
  profile: UserProfile;
  firebaseUser: User | null;
  onSave: (updates: Partial<UserProfile>) => void;
  onGoogleLogin: () => Promise<User | null>;
  onLogout: () => void;
  onClose: () => void;
}

export default function ProfileModal({
  profile,
  firebaseUser,
  onSave,
  onGoogleLogin,
  onLogout,
  onClose,
}: ProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setAvatarUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    const user = await onGoogleLogin();
    if (user) {
      onSave({
        name: user.displayName || "사용자",
        avatarUrl: user.photoURL || "/character-head.png",
        isLoggedIn: true,
        uid: user.uid,
        email: user.email || undefined,
      });
      onClose();
    }
    setIsLoggingIn(false);
  };

  const handleSave = () => {
    onSave({ name: name.trim() || "우리집", avatarUrl });
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleReset = () => {
    if (firebaseUser?.photoURL) {
      setAvatarUrl(firebaseUser.photoURL);
    } else {
      setAvatarUrl("/character-head.png");
    }
  };

  // 로그인 전 화면
  if (!profile.isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-auto p-6 pb-8 shadow-2xl animate-slide-up">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

          <h3 className="text-lg font-bold text-gray-900 mb-1">로그인</h3>
          <p className="text-xs text-gray-400 mb-6">Google 계정으로 시작하세요</p>

          <div className="flex flex-col items-center gap-5">
            {/* 캐릭터 이미지 */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src="/character-head.png"
                alt="기본 프로필"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 구글 로그인 버튼 */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-300 rounded-2xl font-medium text-sm text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {isLoggingIn ? "로그인 중..." : "Google로 로그인"}
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={onClose}
              className="w-full py-3 text-gray-500 bg-gray-100 rounded-2xl font-medium text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 로그인 후 화면
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-auto p-6 pb-8 shadow-2xl animate-slide-up">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <h3 className="text-lg font-bold text-gray-900 mb-5">프로필 설정</h3>

        <div className="space-y-5">
          {/* 아바타 미리보기 + 업로드 */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={avatarUrl}
                alt="프로필 사진"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-teal-50 text-teal-600 rounded-xl text-xs font-semibold hover:bg-teal-100 transition-all"
              >
                사진 변경
              </button>
              {avatarUrl !== "/character-head.png" && avatarUrl !== firebaseUser?.photoURL && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold hover:bg-gray-100 transition-all"
                >
                  기본 이미지
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* 이메일 (읽기 전용) */}
          {profile.email && (
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1.5 block">이메일</label>
              <p className="px-4 py-3 rounded-xl bg-gray-50 text-sm text-gray-500">{profile.email}</p>
            </div>
          )}

          {/* 이름 입력 */}
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-teal-500 text-white rounded-2xl font-semibold text-sm hover:bg-teal-600 active:scale-[0.98] transition-all"
          >
            저장하기
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 bg-gray-100 rounded-2xl font-medium text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
          >
            취소
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-2 py-2 text-red-400 text-xs font-medium hover:text-red-500 active:scale-[0.98] transition-all"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
