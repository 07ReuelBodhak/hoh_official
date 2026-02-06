"use client";

interface SetInputProps {
  setNumber: number;
  mapName: string;
  us: number;
  them: number;
  onChange: (updated: { mapName?: string; us?: number; them?: number }) => void;
  onRemove?: () => void;
}

export default function SetInput({
  setNumber,
  mapName,
  us,
  them,
  onChange,
  onRemove,
}: SetInputProps) {
  return (
    <div className="bg-[#2a1515] border border-[#4b2020] rounded-lg p-4 relative hover:border-[#b20000] transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#b20000]/20 text-[#b20000]">
          SET {setNumber}
        </span>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-[#ce8d8d]/50 hover:text-red-400"
          >
            ✕
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        {/* Map Name */}
        <div>
          <label className="text-[10px] uppercase text-[#ce8d8d] font-bold block mb-1">
            Map / Match Name
          </label>
          <input
            type="text"
            value={mapName}
            onChange={(e) => onChange({ mapName: e.target.value })}
            placeholder="Team 1 vs Team 2"
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white text-xs px-2 py-1"
          />
        </div>

        {/* Score */}
        <div>
          <label className="text-[10px] uppercase text-[#ce8d8d] font-bold block mb-1">
            Score (Us - Them)
          </label>

          <div className="flex items-center gap-2">
            <input
              type="number"
              value={us}
              onChange={(e) => onChange({ us: Number(e.target.value) })}
              className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white text-center py-1"
            />

            <span className="text-[#ce8d8d] font-bold">-</span>

            <input
              type="number"
              value={them}
              onChange={(e) => onChange({ them: Number(e.target.value) })}
              className="w-full bg-[#240f0f] border border-[#4b2020] rounded text-white text-center py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
