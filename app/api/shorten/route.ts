import { NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { originalUrl } = await req.json()
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
    }
  })

  return NextResponse.json({
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrl.shortCode}`
  })
}