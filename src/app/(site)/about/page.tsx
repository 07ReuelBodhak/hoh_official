"use client";

import { useEffect, useState } from "react";

interface StaffMember {
  _id: string;
  name: string;
  role: string;
  description: string;
  discordId: string;
  imageUrl?: string;
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchStaff() {
    setLoading(true);

    try {
      const res = await fetch("/api/staff");
      const data = await res.json();

      console.log("API DATA:", data);

      let staffList: StaffMember[] = [];

      // ✅ Correctly assign response to staffList
      if (Array.isArray(data)) {
        staffList = data;
      } else {
        staffList = data.staff || [];
      }

      // ✅ Role Order
      const roleOrder = [
        "Owner",
        "Co-owner",
        "Moderator",
        "Admin",
        "Tryout Hoster",
        "Scrim Manager",
      ];

      // ✅ Sort properly
      staffList.sort((a, b) => {
        return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
      });

      console.log("SORTED STAFF:", staffList);

      // ✅ Now update state ONCE
      setStaff(staffList);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <main className="min-h-screen bg-[#230f0f] text-white px-6 py-14 flex justify-center">
      <div className="w-full max-w-[1200px]">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tight">
            Management & Staff
          </h1>
          <p className="text-[#ce8d8d] mt-3 text-lg max-w-2xl mx-auto">
            Meet the elite team powering Helm of Hades operations and community.
          </p>
        </div>

        {loading && (
          <p className="text-center text-[#ce8d8d] text-sm">
            Loading staff members...
          </p>
        )}

        {!loading && staff.length === 0 && (
          <div className="w-full flex justify-center">
            <div className="px-6 py-5 rounded-xl border border-[#4b2020] bg-[#2a1212] text-[#ce8d8d] text-sm">
              No staff members found.
            </div>
          </div>
        )}

        {!loading && staff.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div
                key={member._id}
                className="relative rounded-2xl overflow-hidden border border-[#4b2020] bg-[#1a0b0b] shadow-[0_25px_60px_rgba(0,0,0,0.6)] group hover:scale-[1.02] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#b2000020] via-transparent to-[#ff000010]" />

                <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#b2000030] blur-3xl rounded-full" />

                <div className="relative w-full h-[280px] overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#120606] via-transparent to-transparent" />
                </div>

                <div className="relative p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>

                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#b2000050] bg-[#b2000020] text-[#ff4d4d]">
                      {member.role}
                    </span>
                  </div>

                  <p className="text-[#ce8d8d] text-sm leading-relaxed">
                    {member.description}
                  </p>

                  <div className="mt-4 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b2000040] to-transparent" />

                  <a
                    href={`https://discord.com/users/${member.discordId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="mt-2 w-full py-2.5 rounded-xl bg-[#2a1212] border border-[#4b2020] text-[#ce8d8d] hover:text-white hover:bg-[#b2000020] hover:border-[#b20000] transition-all duration-300">
                      View Profile
                    </button>
                  </a>
                </div>

                <div className="absolute inset-0 rounded-2xl border border-[#ffffff08] pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
