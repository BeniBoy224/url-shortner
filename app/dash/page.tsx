import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { WorldMap } from "@/components/custom/dash/world-map"
import { LocationChart } from "@/components/custom/dash/location-chart"
import TotalClicks from "@/components/custom/dash/total-clicks"
import TotalLinksTable from "@/components/custom/dash/tabels/total-links/total-links"

export default async function DashHome() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  // session.user.id requires a fresh token — fall back to name lookup for existing sessions
  let userId = session.user.id
  if (!userId && session.user.name) {
    const user = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: { id: true },
    })
    if (!user) redirect("/login")
    userId = user.id
  }
  if (!userId) redirect("/login")

  const totalClicks = async () => {
    const urlDB = await prisma.url.findMany({
      where: { userId },
      select: { clicks: true },
    })

    let total = 0
    urlDB.forEach(element => {
      total += element.clicks
    })

    return total
  }

  const locations = await prisma.click_locations.findMany({
    where: { url: { userId } },
    select: { country: true },
  })

  const countByCountry: Record<string, number> = {}
  for (const { country } of locations) {
    if (country) countByCountry[country] = (countByCountry[country] ?? 0) + 1
  }

  const mapData = Object.entries(countByCountry).map(([country, clicks]) => ({
    country,
    clicks,
  }))

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
      <section>
        <h2 className="text-2xl font-semibold pb-4">Total Analytics</h2>
        <div className="grid grid-cols-2 gap-6 items-start">
          <WorldMap data={mapData} />
          <div className="flex flex-col gap-6">
            <LocationChart userId={userId} />
            <TotalClicks total={await totalClicks()}/>
          </div>
        </div>
      </section>
      <section>
        <TotalLinksTable userId={userId} />
      </section>
    </div>
  )
}
