interface HeaderProps {
  name: string;
  role: string;
  image: string;
}

export default function Header({ name, role, image }: HeaderProps) {
  return (
    <header
      className="
        sticky top-0 z-20
        flex items-center justify-between
        px-6 py-4
        bg-[#2a1515]/95 backdrop-blur-md
        border-b border-[#4b2020]
      "
    >
      {/* Title */}
      <h2 className="text-xl font-bold tracking-tight">Dashboard Overview</h2>

      {/* Admin Info */}
      <div className="flex items-center gap-4">
        <div className="text-right leading-tight">
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-[#ce8d8d]">{role}</p>
        </div>

        {/* Avatar */}
        <img
          src={image}
          alt="Admin Avatar"
          className="
            w-10 h-10 rounded-full
            border border-[#b20000]
            object-cover
          "
        />
      </div>
    </header>
  );
}
