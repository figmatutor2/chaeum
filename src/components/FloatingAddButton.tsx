"use client";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-6 w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center hover:bg-teal-600 active:scale-95 transition-all z-40"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="10" y1="4" x2="10" y2="16" />
        <line x1="4" y1="10" x2="16" y2="10" />
      </svg>
    </button>
  );
}
