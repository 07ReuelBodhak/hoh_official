"use client";

import StatCard from "../_components/StatCard";
import DashboardTable from "../_components/DashboardTable";
import Header from "../_components/Header";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [adminRole, setAdminRole] = useState<string | null>(null);

  const [stats, setStats] = useState({
    totalMembers: "Loading...",
    onlineMembers: "Loading...",
    activeScrims: "Loading...",
  });

  useEffect(() => {
    async function initAdminDashboard() {
      if (!session) {
        return;
      }

      // ✅ 1. Check Admin Access
      const res = await fetch("/api/admin/check");
      const data = await res.json();

      if (!data.authorized) {
        router.push("/");
        return;
      }

      setAdminRole(data.role);

      // ✅ 2. Fetch Dashboard Stats AFTER Authorization
      const statsRes = await fetch("/api/admin/guild-stats");
      const statsData = await statsRes.json();
      console.log(statsData);

      setStats({
        totalMembers: statsData.totalMembers.toString() ?? "0",
        onlineMembers: statsData.onlineMembers.toString() ?? "0",
        activeScrims: "12",
      });

      setLoading(false);
    }

    initAdminDashboard();
  }, [session, router]);

  if (loading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <>
      <Header
        role={adminRole ?? "Admin"}
        name={session?.user?.name ?? "Admin User"}
        image={session?.user?.image ?? "/default-avatar.png"}
      />

      <div className="p-6 space-y-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Members" value={stats.totalMembers} />
          <StatCard title="Online Members" value={stats.onlineMembers} />
        </div>

        <DashboardTable />
      </div>
    </>
  );
}
