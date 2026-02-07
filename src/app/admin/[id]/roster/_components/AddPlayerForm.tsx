"use client";

import { useState } from "react";
import Notification from "@/components/NotificationProps";

type AddPlayerFormProps = {
  onPlayerAdded: () => void;
};

export default function AddPlayerForm({ onPlayerAdded }: AddPlayerFormProps) {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [positions, setPositions] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const allRoles = [
    "Setter",
    "Wing Spiker",
    "Libero",
    "Third Spiker",
    "Captain",
    "Vice Captain",
  ];

  const togglePosition = (role: string) => {
    setPositions((prev) =>
      prev.includes(role) ? prev.filter((p) => p !== role) : [...prev, role],
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    setNotification(null);

    try {
      const response = await fetch("/api/roster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rank,
          position: positions,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add player");
      }

      const data = await response.json();
      setNotification(data.message);

      onPlayerAdded();
    } catch (error) {
      console.error("Error adding player:", error);
      setNotification("Failed to add player");
    } finally {
      setLoading(false);
      setName("");
      setRank("");
      setPositions([]);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="bg-[#2a1515] rounded-xl border border-[#4b2020] p-6 shadow-sm">
      {notification && <Notification message={notification} />}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-white text-lg font-bold">Add New Player</h3>
        <p className="text-[#ce8d8d] text-sm">
          Enter player details to add them to the official roster.
        </p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* IGN + Rank */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IGN */}
          <div>
            <label className="text-[#ce8d8d] text-xs uppercase font-bold">
              Player IGN
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HadesSlayer99"
              className="w-full mt-2 bg-[#240f0f] border border-[#4b2020] rounded-lg px-4 py-2.5 text-white focus:border-[#b20000] focus:ring-1 focus:ring-[#b20000]"
            />
          </div>

          {/* Rank */}
          <div>
            <label className="text-[#ce8d8d] text-xs uppercase font-bold">
              Competitive Rank
            </label>

            <select
              required
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full mt-2 bg-[#240f0f] border border-[#4b2020] rounded-lg px-4 py-2.5 text-white focus:border-[#b20000] focus:ring-1 focus:ring-[#b20000] cursor-pointer"
            >
              <option value="">Select Rank</option>
              <option value="The Elysian">The Elysian</option>
              <option value="The Centurions">The Centurions</option>
              <option value="The Oracle">The Oracle</option>
            </select>
          </div>
        </div>

        {/* Positions */}
        <div>
          <label className="text-[#ce8d8d] text-xs uppercase font-bold">
            Positions (Select Multiple)
          </label>

          <div className="flex flex-wrap gap-3 mt-3">
            {allRoles.map((role) => {
              const selected = positions.includes(role);

              return (
                <button
                  type="button"
                  key={role}
                  onClick={() => togglePosition(role)}
                  className={`px-4 py-2 rounded-lg border text-sm transition
                    ${
                      selected
                        ? "bg-[#b20000]/20 border-[#b20000] text-white"
                        : "bg-[#240f0f] border-[#4b2020] text-[#ce8d8d] hover:border-[#b20000]"
                    }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end border-t border-[#4b2020]/50 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#b20000] hover:bg-[#8a0000] px-6 py-2 rounded-lg text-white font-bold shadow-lg shadow-[#b20000]/20"
          >
            {loading ? "Adding..." : "Add Player"}
          </button>
        </div>
      </form>
    </div>
  );
}
