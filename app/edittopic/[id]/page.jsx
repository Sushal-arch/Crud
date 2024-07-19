import EditTopicForm from "@/components/EditTopicForm";
import React from "react";

const getTopicById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    const data = await res.json();
    console.log("---da---id", data);
    // Check if data contains title and description
    if (!data.topic.title || !data.topic.description) {
      throw new Error("Title or description missing in API response");
    }

    return {
      title: data.topic.title,
      description: data.topic.description,
    };
  } catch (err) {
    console.error("Error loading topic:", err);
    return {
      title: "", // Provide default or empty values
      description: "",
    };
  }
};

export default async function Page({ params }) {
  const { id } = params;

  // Fetch topic data
  console.log("------id", id);
  const res = await getTopicById(id);
  console.log("res", res);
  const { title, description } = await getTopicById(id);
  console.log("------", title, description);
  return (
    <div>
      <EditTopicForm id={id} title={title} description={description} />
    </div>
  );
}
