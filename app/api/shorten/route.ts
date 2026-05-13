import { NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, remaining } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  const { originalUrl, tracking, userId } = await req.json()
  let shortCodeUnique = false
  let shortCode = ""

  
  while (shortCodeUnique === false) {
    shortCode = nanoid(6)
    const existingShortCode = await prisma.url.findUnique({
      where: {
        shortCode,
      }
    })
    
    if (!existingShortCode) {
      shortCodeUnique = true
    }
  }

  const newUrl = await prisma.url.create({
    data: {
      originalUrl,
      shortCode,
      log: tracking === true ? true : false,
      userId: userId || null,
    }
  })

  console.log(process.env.NEXT_PUBLIC_BASE_URL)

  return NextResponse.json(
    { shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrl.shortCode}` },
    { headers: { "X-RateLimit-Remaining": String(remaining) } }
  )
}