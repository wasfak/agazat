import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await prisma.user.updateMany({
      data: {
        isVac: false,
      },
    });
    return NextResponse.json({ success: "done" });
  } catch (error) {
    console.error("Failed to reset vacation statuses:", error);
    return NextResponse.json({ success: "NoT done" });
  }
}
