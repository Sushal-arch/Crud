import React from "react";
import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopic = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch the data");
    }
    const data = await res.json();
    return data.topics;
  } catch (err) {
    console.error("Error loading topics: ", err);
    return []; // Return empty array if fetch fails
  }
};

const TopicList = async () => {
  const topic = await getTopic();
  return (
    <>
      {topic.map((t) => (
        <div
          key={t._id}
          className="flex justify-between my-3 border border-slate-300 p-4 gap-5 items-center"
        >
          <div>
            <h2 className="font-semibold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveButton id={t._id} />

            <Link href={`/edittopic/${t._id}`} legacyBehavior>
              <a>
                <HiPencilAlt size="24" />
              </a>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;
