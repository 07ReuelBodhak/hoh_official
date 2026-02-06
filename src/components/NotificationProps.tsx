"use client";

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  return (
    <div className="w-full mb-6">
      <div
        className="
          flex items-center gap-4
          px-6 py-4
          rounded-2xl
          border border-[#b20000]/30
          bg-[#1c0b0b]
          shadow-lg shadow-black/40
          hover:border-[#b20000]/60
          transition-all
        "
      >
        {/* Icon */}
        <span className="material-symbols-outlined text-[#b20000] text-[26px]">
          notifications_active
        </span>

        {/* Message */}
        <p className="text-base text-[#ce8d8d] font-semibold tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
}
