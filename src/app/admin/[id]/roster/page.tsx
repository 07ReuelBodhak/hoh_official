"use client";
import AddPlayerForm from "./_components/AddPlayerForm";
import RosterTable from "./_components/RosterTable";

import { useState } from "react";

export default function RosterPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshRoster = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 pb-10">
        <AddPlayerForm onPlayerAdded={refreshRoster} />
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Active Roster</h2>
          <RosterTable refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
