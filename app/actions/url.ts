"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";

export async function updateUrl(urlId: string, destinationUrl: string) {
  await prisma.url.update({
    where: { id: urlId },
    data: { originalUrl: destinationUrl },
  })
}

export async function deleteUrl(urlId: string) {
  await prisma.url.delete({
    where: { id: urlId },
  })
  redirect("/dash")
}
