import connectMongoDb from "@/libs/mongoDb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import { json, Response } from "next/server";
import React from "react";

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    await connectMongoDb();

    const topic = await Topic.create({
      title,
      description,
    });

    return NextResponse.json({ message: "Topic created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { error: "Error creating topic" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDb();

    const topics = await Topic.find();

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error finding topics:", error);
    return NextResponse.json(
      { error: "Error finding topics" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id"); // Extracting id from request
    if (!id) {
      throw new Error("ID parameter is missing");
    }
    await connectMongoDb();
    await Topic.findByIdAndDelete(id);

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topics:", error);
    return NextResponse.json(
      { error: "Error deleting topics" },
      { status: 500 }
    );
  }
}
