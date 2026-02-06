import StaffForm from "./_components/StaffForm";
import StaffTable from "./_components/StaffTable";

export default function StaffPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 pb-10">
        {/* Add Staff */}
        <StaffForm />

        {/* Table */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Active Staff</h2>
          <StaffTable />
        </div>
      </div>
    </div>
  );
}
