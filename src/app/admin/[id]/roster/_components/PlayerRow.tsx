interface PlayerRowProps {
  player: any;
  onDelete: (id: number) => void;
}

export default function PlayerRow({ player, onDelete }: PlayerRowProps) {
  return (
    <tr className="hover:bg-[#4b2020]/20 transition group">
      {/* Player */}
      <td className="px-6 py-4 font-medium text-white">{player.ign}</td>

      {/* Rank */}
      <td className="px-6 py-4 text-[#ce8d8d]">{player.rank}</td>

      {/* Positions */}
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {player.positions.map((pos: string) => (
            <span
              key={pos}
              className="px-2.5 py-0.5 rounded-full text-xs bg-[#240f0f] border border-[#4b2020] text-[#ce8d8d]"
            >
              {pos}
            </span>
          ))}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onDelete(player.id)}
          className="text-[#fa3838] hover:text-white font-bold text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
