import Sidebar from "../_components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#240f0f] text-white overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
