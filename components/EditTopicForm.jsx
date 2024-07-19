// EditTopicForm.jsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }
      router.push("/"); // Redirect after successful update
      router.refresh();
    } catch (err) {
      console.error("Error updating topic: ", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          className="border border-slate-500 px-8 py-2"
          placeholder="Topic title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          className="border border-slate-500 px-8 py-2"
          placeholder="Topic description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-400 font-semibold rounded-md mx-auto py-2 px-4 w-fit"
        >
          Update
        </button>
      </form>
    </div>
  );
}
