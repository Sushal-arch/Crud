"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to create new topic");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic tittle"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></input>
      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic description"
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></input>
      <button
        type="submit"
        className="bg-blue-400 font-semibold rounded-md mx-auto py-2 px-4 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
