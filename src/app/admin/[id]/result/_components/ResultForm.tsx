"use client";

import { useState } from "react";
import SetInput from "./SetInput";
import Notification from "@/components/NotificationProps";

interface SetScore {
  mapName: string;
  us: number;
  them: number;
}

interface MatchResult {
  opponent: string;
  datePlayed: string;
  mode: string;
  sets: SetScore[];
}

export default function ResultForm() {
  const [result, setResult] = useState<MatchResult>({
    opponent: "",
    datePlayed: "",
    mode: "official",
    sets: [
      { mapName: "", us: 0, them: 0 },
      { mapName: "", us: 0, them: 0 },
    ],
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Add New Set
  const addSet = () => {
    if (result.sets.length < 5) {
      setResult((prev) => ({
        ...prev,
        sets: [...prev.sets, { mapName: "", us: 0, them: 0 }],
      }));
    }
  };

  // ✅ Remove Set
  const removeSet = (index: number) => {
    setResult((prev) => ({
      ...prev,
      sets: prev.sets.filter((_, i) => i !== index),
    }));
  };

  // ✅ Update Set Values
  const updateSet = (index: number, updated: Partial<SetScore>) => {
    setResult((prev) => ({
      ...prev,
      sets: prev.sets.map((set, i) =>
        i === index ? { ...set, ...updated } : set,
      ),
    }));
  };

  // ✅ Reset Form
  const resetForm = () => {
    setResult({
      opponent: "",
      datePlayed: "",
      mode: "official",
      sets: [
        { mapName: "", us: 0, them: 0 },
        { mapName: "", us: 0, them: 0 },
      ],
    });
  };

  // ✅ Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submitting result:", result);
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "Failed to create post");
        throw new Error(errText || "Failed to create post");
      }
      setNotification("Blog post published successfully.");
    } catch (error) {
    } finally {
      setLoading(false);
      resetForm();
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2a1515] w-full rounded-xl border border-[#4b2020] p-6 shadow-sm flex flex-col gap-6"
    >
      {/* Notification */}
      {notification && <Notification message={notification} />}
      {/* Opponent / Date / Mode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Opponent */}
        <div>
          <label className="block text-[#ce8d8d] text-xs font-bold uppercase mb-2">
            Opponent Name
          </label>
          <input
            type="text"
            value={result.opponent}
            onChange={(e) => setResult({ ...result, opponent: e.target.value })}
            placeholder="Team Name"
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white px-3 py-2 text-sm"
          />
        </div>

        {/* Date Played */}
        <div>
          <label className="block text-[#ce8d8d] text-xs font-bold uppercase mb-2">
            Date Played
          </label>
          <input
            type="date"
            value={result.datePlayed}
            onChange={(e) =>
              setResult({ ...result, datePlayed: e.target.value })
            }
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white px-3 py-2 text-sm"
          />
        </div>

        {/* Mode */}
        <div>
          <label className="block text-[#ce8d8d] text-xs font-bold uppercase mb-2">
            Mode
          </label>
          <select
            value={result.mode}
            onChange={(e) => setResult({ ...result, mode: e.target.value })}
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white px-3 py-2 text-sm"
          >
            <option value="official">Official</option>
            <option value="friendly">Friendly</option>
            <option value="community">Community</option>
          </select>
        </div>
      </div>

      {/* Sets */}
      <div className="flex flex-col gap-4">
        <label className="text-white font-bold">Match Sets & Scores</label>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {result.sets.map((set, index) => (
            <SetInput
              key={index}
              setNumber={index + 1}
              mapName={set.mapName}
              us={set.us}
              them={set.them}
              onChange={(updated) => updateSet(index, updated)}
              onRemove={index >= 2 ? () => removeSet(index) : undefined}
            />
          ))}

          {/* Add Set Button */}
          {result.sets.length < 5 && (
            <button
              type="button"
              onClick={addSet}
              className="border border-dashed border-[#4b2020] rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-[#ce8d8d] hover:text-white hover:border-[#b20000]"
            >
              <span className="material-symbols-outlined">add</span>
              Add Set
            </button>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={resetForm}
          className="px-4 py-2 text-sm text-[#ce8d8d] hover:text-white"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2 bg-[#b20000] hover:bg-[#8a0000] text-white rounded-lg text-sm font-bold"
        >
          {loading ? "Submitting..." : "Submit Result"}
        </button>
      </div>
    </form>
  );
}
