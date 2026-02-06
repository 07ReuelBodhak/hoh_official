"use client";

import { useEffect, useState } from "react";

interface SetScore {
  mapName: string;
  us: number;
  them: number;
}

interface ScrimResult {
  _id: string;
  opponent: string;
  datePlayed: string;
  mode: "official" | "friendly" | "community";
  sets: SetScore[];
}

export default function ResultsTable() {
  const [results, setResults] = useState<ScrimResult[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Notification State
  const [notification, setNotification] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 3;

  // ✅ Reusable Fetch Function
  const fetchResults = async () => {
    try {
      const res = await fetch("/api/result", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("❌ Error fetching results:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Results on Load + Auto Refresh Every 2 Seconds
  useEffect(() => {
    fetchResults();

    // ✅ Auto update table when new result is added
    const interval = setInterval(() => {
      fetchResults();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Calculate Win/Loss from Sets
  const calculateMatchResult = (sets: SetScore[]) => {
    let usWins = 0;
    let themWins = 0;

    sets.forEach((set) => {
      if (set.us > set.them) usWins++;
      else if (set.them > set.us) themWins++;
    });

    if (usWins > themWins) return `Win ${usWins}-${themWins}`;
    if (themWins > usWins) return `Loss ${usWins}-${themWins}`;
    return `Draw ${usWins}-${themWins}`;
  };

  // ✅ Convert sets into readable maps string
  const formatMaps = (sets: SetScore[]) => {
    return sets
      .map((set) => `${set.mapName} (${set.us}-${set.them})`)
      .join(", ");
  };

  // Pagination logic
  const totalPages = Math.ceil(results.length / perPage);
  const startIndex = (page - 1) * perPage;
  const currentResults = results.slice(startIndex, startIndex + perPage);

  // ✅ Delete Function + Notification + Instant Refresh
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/result/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // ✅ Show Notification
      setNotification("Result deleted successfully.");

      // ✅ Refresh Table Immediately
      fetchResults();

      // ✅ Hide Notification After 3s
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error("Delete failed:", err);
      setNotification("Failed to delete result.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="text-white text-sm p-6">Loading scrim results...</div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#4b2020] bg-[#2a1515] shadow-sm">
      {/* ✅ Notification */}
      {notification && (
        <div className="p-3 text-sm text-white bg-[#b20000]/30 border-b border-[#4b2020]">
          {notification}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-[#ce8d8d] whitespace-nowrap">
          <thead className="bg-[#4b2020]/40 text-xs uppercase text-white font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Opponent</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Maps</th>
              <th className="px-6 py-4">Result</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#4b2020]/40">
            {currentResults.map((scrim) => (
              <tr
                key={scrim._id}
                className="hover:bg-[#4b2020]/20 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-white">
                  {scrim.opponent}
                </td>

                <td className="px-6 py-4">
                  {new Date(scrim.datePlayed).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span className="text-xs bg-[#240f0f] px-2 py-1 rounded border border-[#4b2020]">
                    {scrim.mode.toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-4 text-xs text-[#ce8d8d]/80">
                  {formatMaps(scrim.sets)}
                </td>

                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-[#b20000]/10 px-2.5 py-1 text-xs font-bold text-[#b20000] ring-1 ring-inset ring-[#b20000]/30">
                    {calculateMatchResult(scrim.sets)}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(scrim._id)}
                    className="p-2 rounded-md hover:bg-[#fa3838]/20 text-[#ce8d8d] hover:text-[#fa3838] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}

            {results.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#ce8d8d]">
                  No scrim results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#4b2020]/40 px-6 py-4 bg-[#240f0f]/40 flex items-center justify-between">
        <p className="text-xs text-[#ce8d8d]">
          Page <span className="font-bold text-white">{page}</span> of{" "}
          <span className="font-bold text-white">{totalPages}</span>
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-3 py-1 rounded bg-[#240f0f] border border-[#4b2020] text-[#ce8d8d] hover:text-white disabled:opacity-40 text-xs font-medium"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-3 py-1 rounded bg-[#240f0f] border border-[#4b2020] text-[#ce8d8d] hover:text-white disabled:opacity-40 text-xs font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
