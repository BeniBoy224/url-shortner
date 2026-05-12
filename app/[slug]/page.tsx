"use server"

import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma";
import { getLocation } from "@/lib/getLocation";

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params

  const url = await prisma.url.findUnique({
    where: { shortCode: slug }
  })

  console.log(url)

  if (!url) {
    return <div className="text-center text-2xl font-semibold">Link not found</div>
  }

  if (url.log === true) {
    const headersList = await headers()
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
      headersList.get("x-real-ip") ??
      "unknown"
  
    const location = await getLocation(ip)

    console.log("Logging click from IP:", ip, "Location:", location)
  
    await Promise.all([
      prisma.url.update({
        where: { shortCode: slug },
        data: { clicks: { increment: 1 } }
      }),
      prisma.click_locations.create({
        data: { urlId: url.id, ...location }
      })
    ])
  }

  redirect(url.originalUrl)
}