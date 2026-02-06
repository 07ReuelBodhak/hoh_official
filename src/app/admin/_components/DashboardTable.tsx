"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface SetScore {
  mapName: string;
  us: number;
  them: number;
}

export interface MatchResult {
  _id: string;
  opponent: string;
  datePlayed: string;
  mode: "official" | "friendly" | "community";
  sets: SetScore[];
}

export default function DashboardTable() {
  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const res = await fetch("/api/result");

      if (!res.ok) throw new Error("Failed to fetch results");

      const data = await res.json();

      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (error) {
      console.error("Fetch Results Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getMatchOutcome = (match: MatchResult) => {
    let usWins = 0;
    let themWins = 0;

    match.sets.forEach((set) => {
      if (set.us > set.them) usWins++;
      else if (set.them > set.us) themWins++;
    });

    return usWins > themWins ? "Victory" : "Defeat";
  };

  const totalMatches = results.length;

  const totalWins = results.filter(
    (m) => getMatchOutcome(m) === "Victory",
  ).length;

  const totalDefeats = totalMatches - totalWins;

  const officialCount = results.filter((m) => m.mode === "official").length;
  const friendlyCount = results.filter((m) => m.mode === "friendly").length;
  const communityCount = results.filter((m) => m.mode === "community").length;

  const chartData = [
    { name: "Wins", value: totalWins },
    { name: "Defeats", value: totalDefeats },
    { name: "Official", value: officialCount },
    { name: "Friendly", value: friendlyCount },
    { name: "Community", value: communityCount },
  ];

  if (loading) {
    return <p className="text-[#ce8d8d] text-sm">Loading match results...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-[#4b2020] bg-[#2a1515] p-4">
        <h2 className="text-white font-bold mb-3">
          Match Performance Overview
        </h2>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#ce8d8d" />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-[#ce8d8d] mt-2">
          Total Matches Played:{" "}
          <span className="text-white font-bold">{totalMatches}</span>
        </p>
      </div>

      <div className="rounded-xl overflow-hidden border border-[#4b2020] bg-[#2a1515]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#4b2020] text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Opponent</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Result</th>
            </tr>
          </thead>

          <tbody>
            {results.map((match) => {
              const outcome = getMatchOutcome(match);

              return (
                <tr
                  key={match._id}
                  className="hover:bg-[#4b2020]/40 transition"
                >
                  <td className="px-6 py-4 font-bold text-white">
                    {match.opponent}
                  </td>

                  <td className="px-6 py-4 text-[#ce8d8d]">
                    {match.datePlayed}
                  </td>

                  <td className="px-6 py-4 text-white capitalize">
                    {match.mode}
                  </td>

                  <td
                    className={`px-6 py-4 font-bold ${
                      outcome === "Victory" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {outcome}
                  </td>
                </tr>
              );
            })}

            {results.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-[#ce8d8d]">
                  No match results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
