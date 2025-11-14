// app/api/icons/metadata/route.ts
import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const metadataPath = join(process.cwd(), "data", "metadata.json");
    const metadataContent = readFileSync(metadataPath, "utf-8");
    const iconMetadata = JSON.parse(metadataContent);

    return NextResponse.json(iconMetadata);
  } catch (error) {
    return NextResponse.json({ icons: [] }, { status: 500 });
  }
}
