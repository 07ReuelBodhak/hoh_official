"use client";

import React, { useEffect, useState } from "react";

interface SetScore {
  mapName: string;
  us: number;
  them: number;
}

interface MatchResult {
  _id: string;
  opponent: string;
  datePlayed: string;
  mode: "official" | "friendly" | "community";
  sets: SetScore[];
  result?: "win" | "loss";
}

export default function ResultPage() {
  const [allResults, setAllResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 5;

  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function fetchResults() {
    setLoading(true);

    try {
      const res = await fetch("/api/result");
      const data = await res.json();
      setAllResults(data.results || []);
    } catch (err) {
      console.error("Failed to fetch results:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchResults();
  }, []);

  const total = allResults.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const paginatedResults = allResults.slice(startIndex, startIndex + limit);

  const totalOfficial = allResults.filter((m) => m.mode === "official").length;
  const totalFriendly = allResults.filter((m) => m.mode === "friendly").length;
  const totalCommunity = allResults.filter(
    (m) => m.mode === "community",
  ).length;

  let totalWins = 0;

  allResults.forEach((match) => {
    const usWins = match.sets.filter((s) => s.us > s.them).length;
    const themWins = match.sets.filter((s) => s.them > s.us).length;
    if (usWins > themWins) totalWins++;
  });

  const winRate = total > 0 ? ((totalWins / total) * 100).toFixed(1) : "0.0";

  return (
    <main className="flex min-h-screen justify-center bg-[#230f0f] text-white px-4 py-10">
      <div className="w-full max-w-[1200px]">
        <div className="mb-8">
          <h1 className="text-4xl font-black tracking-tight">
            Scrim Records & Stats
          </h1>
          <p className="text-[#ce8d8d] mt-2 text-lg">
            Track performance across all official and friendly matches.
          </p>
        </div>

        {!loading && allResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="rounded-xl p-6 bg-[#2a1212] border border-[#4b2020]">
              <p className="text-[#ce8d8d] text-xs uppercase tracking-wider">
                Total Official
              </p>
              <p className="text-4xl font-bold mt-2">{totalOfficial}</p>
            </div>

            <div className="rounded-xl p-6 bg-[#2a1212] border border-[#4b2020]">
              <p className="text-[#ce8d8d] text-xs uppercase tracking-wider">
                Total Friendly
              </p>
              <p className="text-4xl font-bold mt-2">{totalFriendly}</p>
            </div>

            <div className="rounded-xl p-6 bg-[#2a1212] border border-[#4b2020]">
              <p className="text-[#ce8d8d] text-xs uppercase tracking-wider">
                Total Community
              </p>
              <p className="text-4xl font-bold mt-2">{totalCommunity}</p>
            </div>

            <div className="rounded-xl p-6 bg-[#2a1212] border border-[#4b2020]">
              <p className="text-[#ce8d8d] text-xs uppercase tracking-wider">
                Win Rate
              </p>
              <p className="text-4xl font-bold mt-2">{winRate}%</p>

              <div className="w-full bg-[#4b2020] rounded-full h-2 mt-4">
                <div
                  className="bg-[#b20000] h-2 rounded-full"
                  style={{ width: `${winRate}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {loading && (
          <p className="text-[#ce8d8d] text-sm">Loading scrim records...</p>
        )}

        {!loading && allResults.length === 0 && (
          <div className="p-6 rounded-xl border border-[#4b2020] bg-[#2a1212]">
            <p className="text-[#ce8d8d] text-sm">No scrim records found.</p>
          </div>
        )}

        {!loading && paginatedResults.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-[#4b2020] bg-[#2a1212] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-[#361717] border-b border-[#4b2020]">
                    <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-semibold uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-semibold uppercase">
                      Opponent
                    </th>
                    <th className="px-6 py-4 text-center text-[#ce8d8d] text-xs font-semibold uppercase">
                      Mode
                    </th>
                    <th className="px-6 py-4 text-center text-[#ce8d8d] text-xs font-semibold uppercase">
                      Score
                    </th>
                    <th className="px-6 py-4 text-center text-[#ce8d8d] text-xs font-semibold uppercase">
                      Result
                    </th>
                    <th className="px-6 py-4 text-left text-[#ce8d8d] text-xs font-semibold uppercase">
                      Maps
                    </th>
                    <th className="px-6 py-4 text-right text-[#ce8d8d] text-xs font-semibold uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#4b2020]">
                  {paginatedResults.map((match) => {
                    const usWins = match.sets.filter(
                      (s) => s.us > s.them,
                    ).length;

                    const themWins = match.sets.filter(
                      (s) => s.them > s.us,
                    ).length;

                    const matchResult = usWins > themWins ? "win" : "loss";

                    return (
                      <React.Fragment key={match._id}>
                        <tr className="hover:bg-[#361717] transition">
                          <td className="px-6 py-4 text-[#ce8d8d] font-mono">
                            {match.datePlayed}
                          </td>

                          <td className="px-6 py-4 text-white font-medium">
                            {match.opponent}
                          </td>

                          <td className="px-6 py-4 text-center text-[#ce8d8d] capitalize">
                            {match.mode}
                          </td>

                          <td className="px-6 py-4 text-center font-bold text-white">
                            {usWins}-{themWins}
                          </td>

                          <td
                            className={`px-6 py-4 text-center font-bold uppercase ${
                              matchResult === "win"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {matchResult}
                          </td>

                          <td className="px-6 py-4 text-[#ce8d8d]">
                            {match.sets.map((s) => s.mapName).join(", ")}
                          </td>

                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                setExpandedId(
                                  expandedId === match._id ? null : match._id,
                                )
                              }
                              className="px-3 py-1 rounded-lg text-[#ce8d8d] hover:text-white hover:bg-[#4b2020]"
                            >
                              {expandedId === match._id ? "Hide" : "View"}
                            </button>
                          </td>
                        </tr>

                        {expandedId === match._id && (
                          <tr className="bg-[#281010]">
                            <td colSpan={7} className="px-8 py-6">
                              <p className="text-xs uppercase text-[#ce8d8d] font-bold mb-4">
                                Map Breakdown
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {match.sets.map((set, i) => (
                                  <div
                                    key={i}
                                    className="p-4 rounded-lg bg-[#361717] border border-[#4b2020]"
                                  >
                                    <p className="text-white font-semibold">
                                      {set.mapName}
                                    </p>

                                    <p className="mt-2 text-sm">
                                      <span className="text-green-400 font-bold">
                                        {set.us}
                                      </span>
                                      {" - "}
                                      <span className="text-red-400 font-bold">
                                        {set.them}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center px-6 py-4 bg-[#361717] border-t border-[#4b2020]">
              <p className="text-sm text-[#ce8d8d]">
                Page <span className="text-white font-semibold">{page}</span> of{" "}
                <span className="text-white font-semibold">{totalPages}</span>
              </p>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 rounded bg-[#2a1212] border border-[#4b2020] text-[#ce8d8d] hover:text-white disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 rounded bg-[#2a1212] border border-[#4b2020] text-[#ce8d8d] hover:text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
