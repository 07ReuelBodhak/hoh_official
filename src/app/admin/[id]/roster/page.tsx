import AddPlayerForm from "./_components/AddPlayerForm";
import RosterTable from "./_components/RosterTable";

export default function RosterPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 pb-10">
        <AddPlayerForm />
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Active Roster</h2>
          <RosterTable />
        </div>
      </div>
    </div>
  );
}
