"use client";

import { useEffect, useState } from "react";
import Notification from "@/components/NotificationProps";

type RosterTableProps = {
  refreshKey: number;
};

export default function RosterTable({ refreshKey }: RosterTableProps) {
  const [players, setPlayers] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);

  // ✅ Notification State
  const [notification, setNotification] = useState<string | null>(null);

  const perPage = 3;

  // ✅ Fetch roster from API
  const fetchRoster = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/roster");

      if (!res.ok) throw new Error("Failed to fetch roster");

      const data = await res.json();
      setPlayers(data);
    } catch (error) {
      console.error("Roster Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load roster on mount
  useEffect(() => {
    fetchRoster();
  }, [refreshKey]);

  const pages = Math.ceil(players.length / perPage);

  const paginatedPlayers = players.slice(
    page * perPage,
    page * perPage + perPage,
  );

  // ✅ Delete Player (Instant UI Update + Notification)
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/roster/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setPlayers((prev) => prev.filter((p) => p._id !== id));

      setNotification("Player deleted successfully!");

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Delete Error:", error);

      setNotification("Failed to delete player!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // ✅ Loading UI (No style changed)
  if (loading) {
    return (
      <div className="text-white text-sm p-6">Loading roster players...</div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* ✅ Notification */}
      {notification && <Notification message={notification} />}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#4b2020]/50 bg-[#2a1515] shadow-sm">
        <table className="w-full text-left text-sm text-[#ce8d8d]">
          {/* Header */}
          <thead className="bg-[#4b2020]/30 text-xs uppercase text-white font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Player</th>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Positions</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#4b2020]/30">
            {paginatedPlayers.map((player) => (
              <tr
                key={player._id}
                className="hover:bg-[#4b2020]/20 transition-colors group"
              >
                {/* IGN */}
                <td className="px-6 py-4">
                  <span className="text-white font-bold text-base group-hover:text-[#b20000] cursor-pointer">
                    {player.name}
                  </span>
                </td>

                {/* Rank */}
                <td className="px-6 py-4">
                  <span className="text-white text-xs font-semibold">
                    {player.rank}
                  </span>
                </td>

                {/* Positions */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {player.position.map((pos: string, i: number) => (
                      <span
                        key={i}
                        className="bg-[#4b2020]/30 text-[#ce8d8d] text-xs px-2 py-1 rounded-md font-bold"
                      >
                        {pos}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Delete Action */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(player._id)}
                    className="p-1.5 rounded hover:bg-[#fa3838]/20 text-[#ce8d8d] hover:text-[#fa3838] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-[#ce8d8d]">
                  No players found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="border-t border-[#4b2020]/30 px-6 py-4 bg-[#4b2020]/10 flex justify-between items-center">
          <span className="text-xs text-[#ce8d8d]">
            Showing {players.length === 0 ? 0 : page * perPage + 1}-
            {Math.min((page + 1) * perPage, players.length)} of {players.length}{" "}
            players
          </span>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-[#ce8d8d] text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-[#ce8d8d] text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
              disabled={page === pages - 1 || players.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
