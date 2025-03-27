// app/api/schools/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const schools = await prisma.school.findMany();
    return NextResponse.json(schools);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate input
    const { name, subdomain, contactEmail, description } = body;

    if (!name || !subdomain) {
      return NextResponse.json({ error: "Name and subdomain are required" }, { status: 400 });
    }

    // Check if subdomain already exists
    const existingSchool = await prisma.school.findUnique({
      where: { subdomain },
    });

    if (existingSchool) {
      return NextResponse.json({ error: "Subdomain already exists" }, { status: 400 });
    }

    const newSchool = await prisma.school.create({
      data: {
        name,
        subdomain,
        contactEmail,
        description,
      },
    });

    return NextResponse.json(newSchool, { status: 201 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 });
  }
}
