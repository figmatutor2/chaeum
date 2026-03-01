"use client";

interface HeaderProps {
  onAddItem: () => void;
}

export default function Header({ onAddItem }: HeaderProps) {
  return (
    <header className="pt-6 pb-2 px-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          채움
        </h1>
        <button
          onClick={onAddItem}
          className="w-11 h-11 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-200 hover:bg-teal-600 active:scale-95 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="10" y1="4" x2="10" y2="16" />
            <line x1="4" y1="10" x2="16" y2="10" />
          </svg>
        </button>
      </div>
    </header>
  );
}
