"use server"

import { prisma } from "@/lib/prisma"

export async function updateUrl(urlId: string, destinationUrl: string) {
  await prisma.url.update({
    where: { id: urlId },
    data: { originalUrl: destinationUrl },
  })
}
