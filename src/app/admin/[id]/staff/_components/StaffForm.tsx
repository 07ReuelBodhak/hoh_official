"use client";

import { useState } from "react";
import Notification from "@/components/NotificationProps";

export default function StaffForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "Upload failed");
      throw new Error(errText || "Image upload failed");
    }

    const data = await res.json();

    if (!data?.url) throw new Error("No URL returned from upload");

    return data.url;
  };

  async function handleAddStaff(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setNotification("");

    try {
      let uploadedUrl = "";

      const fileInput = document.getElementById(
        "staffImage",
      ) as HTMLInputElement;

      if (fileInput?.files && fileInput.files.length > 0) {
        uploadedUrl = await uploadImage(fileInput.files[0]);

        setImageUrl(uploadedUrl);
      }

      const res = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          role,
          description,
          discordId,
          image: uploadedUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add staff member");
      }

      setNotification("✅ Staff member added successfully!");
    } catch (error) {
      console.error("Add Staff Error:", error);
      setNotification("❌ Failed to add staff member");
    } finally {
      setName("");
      setRole("");
      setDescription("");
      setDiscordId("");
      setImageUrl("");

      setLoading(false);
      setTimeout(() => setNotification(""), 3000);
    }
  }

  return (
    <div className="bg-[#2a1515] border border-[#4b2020] rounded-xl p-6">
      <h2 className="text-lg font-bold mb-4">Add Staff Member</h2>

      {notification && <Notification message={notification} />}

      <form onSubmit={handleAddStaff} className="space-y-4">
        <div>
          <label className="text-xs uppercase text-[#ce8d8d] font-bold block mb-1">
            Staff Name
          </label>
          <input
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter staff name"
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-[#ce8d8d] font-bold block mb-1">
            Discord Id
          </label>
          <input
            value={discordId}
            required
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Enter staff name"
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#ce8d8d] font-bold block mb-1">
            Role
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Coach / Manager / Player"
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#ce8d8d] font-bold block mb-1">
            Description
          </label>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something..."
            rows={3}
            className="w-full bg-[#240f0f] border border-[#4b2020] rounded-lg px-3 py-2 text-white text-sm"
          />
        </div>

        <div>
          <label className="text-xs uppercase text-[#ce8d8d] font-bold block mb-1">
            Staff Image (Only 1)
          </label>

          <input
            id="staffImage"
            type="file"
            required
            accept="image/png"
            className="w-full text-sm text-[#ce8d8d]
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-[#b20000] file:text-white
              hover:file:bg-[#fa3838]"
          />

          {imageUrl && (
            <p className="text-xs text-green-400 mt-2">
              Uploaded Image URL: {imageUrl}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#b20000] hover:bg-[#fa3838] py-2 rounded-lg font-bold text-sm disabled:opacity-50"
        >
          {loading ? "Adding Staff..." : "Add Staff"}
        </button>
      </form>
    </div>
  );
}
