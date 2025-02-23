import connectMongoDb from "@/libs/mongoDb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params; // Extracting id from params
    const { newTitle: title, newDescription: description } =
      await request.json();

    await connectMongoDb(); // Connect to MongoDB
    await Topic.findByIdAndUpdate(id, { title, description }); // Update topic by id

    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating:", error);
    return NextResponse.json(
      { error: "Error updating topic" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params; // Extracting id from params
    await connectMongoDb();
    const topic = await Topic.findOne({ _id: id });

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Error finding topic:", error);
    return NextResponse.json({ error: "Error finding topic" }, { status: 500 });
  }
}
