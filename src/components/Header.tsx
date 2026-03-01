"use client";

import Image from "next/image";

interface HeaderProps {
  avatarUrl: string;
  onProfileClick: () => void;
}

export default function Header({ avatarUrl, onProfileClick }: HeaderProps) {
  return (
    <header className="pt-6 pb-2 px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          chaeum
        </h1>
        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-teal-400 active:scale-95 transition-all"
        >
          <Image
            src={avatarUrl}
            alt="프로필"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
