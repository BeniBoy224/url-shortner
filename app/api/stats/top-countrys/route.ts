import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { userId, urlId } = await req.json()

  const locations = await prisma.click_locations.findMany({
    where: {
      url: {
        userId,
        ...(urlId ? { id: urlId } : {}),
      },
    },
    select: { country: true },
  })

  const countByCountry: Record<string, number> = {}
  for (const { country } of locations) {
    if (country) countByCountry[country] = (countByCountry[country] ?? 0) + 1
  }

  const data = Object.entries(countByCountry)
    .map(([country, clicks]) => ({ country, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5)

  return NextResponse.json(
    { data },
    { headers: { "X-RateLimit-Remaining": String(remaining) } }
  )
}
