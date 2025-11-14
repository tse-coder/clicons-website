// app/api/icons/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import Fuse from "fuse.js";

// Load metadata
let iconMetadata: { icons: Array<{ name: string; tags: string[] }> };
try {
  const metadataPath = join(process.cwd(), "data", "metadata.json");
  const metadataContent = readFileSync(metadataPath, "utf-8");
  iconMetadata = JSON.parse(metadataContent);
} catch (error) {
  iconMetadata = { icons: [] };
}

// Configure Fuse.js
const fuse = new Fuse(iconMetadata.icons, {
  keys: ["name", "tags"],
  threshold: 0.3,
  ignoreLocation: true,
});

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return NextResponse.json({ icons: [] });
  }

  const results = fuse.search(query);
  const icons = results.map((result) => result.item);

  return NextResponse.json({ icons });
}
