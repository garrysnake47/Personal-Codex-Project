import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const logs = await prisma.workLog.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(logs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, task, date } = body;

  if (!title || !content || !task || !date) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const created = await prisma.workLog.create({
    data: { title, content, task, date: new Date(date) }
  });

  return NextResponse.json(created, { status: 201 });
}
