"use client";

import { useEffect, useState } from "react";

interface Player {
  _id: string;
  name: string;
  rank: "The Centurions" | "The Elysian" | "The Oracle";
  position: string[];
}

/* ✅ Icons for Positions */
const positionIcons: Record<string, string> = {
  Setter: "👐",
  "Wing Spiker": "🏐",
  Libero: "🛡️",
  "Third Spiker": "⚡",
  Captain: "👑",
  "Vice Captain": "⭐",
};

export default function CommunityRosterPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Players from API
  const fetchRoster = async () => {
    try {
      const res = await fetch("/api/roster");
      const data = await res.json();
      setPlayers(data || []);
    } catch (err) {
      console.error("Roster Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoster();
  }, []);

  /* ✅ Group Players by Rank */
  const centurions = players.filter((p) => p.rank === "The Centurions");
  const elysian = players.filter((p) => p.rank === "The Elysian");
  const oracle = players.filter((p) => p.rank === "The Oracle");

  /* ✅ Role Logic */
  const getRole = (player: Player) => {
    if (player.position.includes("Captain")) return "Captain 👑";
    if (player.position.includes("Vice Captain")) return "Vice Captain ⭐";
    return "Player";
  };

  /* ✅ Rank Section */
  const RankSection = ({
    title,
    tier,
    borderColor,
    list,
  }: {
    title: string;
    tier: string;
    borderColor: string;
    list: Player[];
  }) => (
    <section className="mb-14">
      {/* Section Title */}
      <div
        className={`flex items-center gap-3 mb-6 px-4 border-l-4 ${borderColor}`}
      >
        <h2 className="text-white text-2xl font-bold tracking-tight">
          {title}
        </h2>

        <span className="px-2 py-1 rounded bg-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider border border-white/10">
          {tier}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#4b2020] bg-[#2c1414] overflow-hidden shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-[#361717] border-b border-[#4b2020]">
                {/* IGN */}
                <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-bold uppercase tracking-wider">
                  IGN
                </th>

                {/* Role */}
                <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-bold uppercase tracking-wider">
                  Role
                </th>

                {/* Positions */}
                <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-bold uppercase tracking-wider">
                  Positions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#4b2020]">
              {list.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-[#ce8d8d]">
                    No players available.
                  </td>
                </tr>
              ) : (
                list.map((player) => (
                  <tr
                    key={player._id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    {/* IGN */}
                    <td className="px-6 py-4 font-bold text-white">
                      {player.name}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 text-white font-medium">
                      {getRole(player)}
                    </td>

                    {/* Positions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {player.position
                          .filter(
                            (pos) =>
                              pos !== "Captain" && pos !== "Vice Captain",
                          )
                          .map((pos, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white"
                            >
                              {positionIcons[pos] || "🏐"} {pos}
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  if (loading) {
    return (
      <p className="text-center text-[#ce8d8d] mt-10">Loading roster...</p>
    );
  }

  return (
    <main className="min-h-screen bg-[#230f0f] flex flex-col items-center">
      <div className="w-full max-w-[960px] px-6 py-12">
        {/* Page Heading */}
        <div className="mb-12">
          <h1 className="text-white text-5xl font-black tracking-tight">
            Active Roster
          </h1>

          <p className="text-[#ce8d8d] text-lg max-w-xl mt-3">
            Current lineup for Helm of Hades competitive division.
          </p>
        </div>

        {/* Rank Sections */}
        <RankSection
          title="Centurions"
          tier="Tier 1"
          borderColor="border-[#b20000]"
          list={centurions}
        />

        <RankSection
          title="Elysian"
          tier="Tier 2"
          borderColor="border-white/20"
          list={elysian}
        />

        <RankSection
          title="Oracle"
          tier="Tier 3"
          borderColor="border-[#ce8d8d]/50"
          list={oracle}
        />
      </div>
    </main>
  );
}
