interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl p-5 bg-[#2a1515] border border-[#4b2020] hover:border-[#b20000] transition">
      <p className="text-[#ce8d8d] text-sm uppercase tracking-wider">{title}</p>

      <p className="text-white text-3xl font-bold mt-2">{value}</p>

      <p className="text-[#ce8d8d]/50 text-xs mt-1">vs last month</p>
    </div>
  );
}
