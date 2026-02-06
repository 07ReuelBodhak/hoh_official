"use client";

import React, { useEffect, useState } from "react";
import Notification from "@/components/NotificationProps";

interface Staff {
  _id: string;
  imageUrl?: string;
  name: string;
  description: string;
  role: string;
  status?: "Active" | "Inactive";
  createdAt?: string;
}

export default function StaffTable() {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const [notification, setNotification] = useState<string | null>(null);

  const [page, setPage] = useState(0);

  const perPage = 2;

  // ✅ Delete Staff Member
  const handleDeleteStaff = async (id: string) => {
    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete staff");
      }

      setStaffMembers((prev) => prev.filter((staff) => staff._id !== id));

      setNotification("Player deleted successfully!");

      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Delete Staff Error:", error);
      setNotification("Failed to delete player!");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/staff");

      if (!res.ok) throw new Error("Failed to fetch staff");

      const data = await res.json();

      setStaffMembers(data);
    } catch (error) {
      console.error("Staff Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const pages = Math.ceil(staffMembers.length / perPage);

  const paginatedStaff = staffMembers.slice(
    page * perPage,
    page * perPage + perPage,
  );

  return (
    <div className="flex flex-col gap-4">
      {notification && <Notification message={notification} />}

      <h3 className="text-white text-xl font-bold tracking-tight">
        Staff Members
      </h3>

      <div className="overflow-x-auto rounded-xl border border-[#4b2020]/50 bg-[#2a1515] shadow-sm">
        <table className="w-full text-left text-sm text-[#ce8d8d]">
          <thead className="bg-[#4b2020]/30 text-xs uppercase text-white font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4 w-20">Image</th>
              <th className="px-6 py-4">Name & Description</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date Joined</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#4b2020]/30">
            {loading && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#ce8d8d]">
                  Loading staff...
                </td>
              </tr>
            )}

            {!loading &&
              paginatedStaff.map((staff) => (
                <tr
                  key={staff._id}
                  className="hover:bg-[#4b2020]/20 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="h-12 w-20 rounded overflow-hidden relative bg-[#4b2020]/50 flex items-center justify-center">
                      {staff.imageUrl ? (
                        <img
                          src={staff.imageUrl}
                          className="w-full h-full object-cover"
                          alt={staff.name}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-[#ce8d8d]">
                          person
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col max-w-md">
                      <span className="text-white font-bold text-base mb-1 group-hover:text-[#b20000] cursor-pointer">
                        {staff.name}
                      </span>
                      <span className="text-[#ce8d8d]/70 text-xs truncate">
                        {staff.description}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-white text-xs font-semibold">
                      {staff.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ${
                        staff.status === "Inactive"
                          ? "bg-[#ce8d8d]/10 text-[#ce8d8d] ring-1 ring-[#ce8d8d]/20"
                          : "bg-[#0bda0b]/10 text-[#0bda0b] ring-1 ring-[#0bda0b]/20"
                      }`}
                    >
                      {staff.status || "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium">
                    {staff.createdAt
                      ? new Date(staff.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={loading}
                        onClick={() => handleDeleteStaff(staff._id)}
                        className="p-1.5 rounded hover:bg-[#fa3838]/20 text-[#ce8d8d] hover:text-[#fa3838] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && staffMembers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#ce8d8d]">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="border-t border-[#4b2020]/30 px-6 py-4 bg-[#4b2020]/10 flex justify-between items-center">
          <span className="text-xs text-[#ce8d8d]">
            Showing {staffMembers.length === 0 ? 0 : page * perPage + 1}-
            {Math.min((page + 1) * perPage, staffMembers.length)} of{" "}
            {staffMembers.length} staff
          </span>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-[#ce8d8d] text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              Prev
            </button>

            <button
              className="px-3 py-1 rounded bg-[#4b2020]/20 hover:bg-[#4b2020]/40 text-[#ce8d8d] text-xs font-bold disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
              disabled={page === pages - 1 || staffMembers.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
