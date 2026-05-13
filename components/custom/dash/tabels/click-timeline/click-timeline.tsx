import { prisma } from "@/lib/prisma"
import { columns, ClickTimeline } from "./columns"
import { DataTable } from "./data-table"

async function getData(urlId: string): Promise<ClickTimeline[]> {
  const clickLocation = await prisma.click_locations.findMany({
    where: { urlId },
    select: { click_time: true, country: true, city: true, regionName: true },
  })

  return clickLocation.map((location) => ({
    click_time: location.click_time,
    country: location.country,
    city: location.city,
    region_name: location.regionName,
  }))
}

export default async function TotalLinksTable({urlId}: {urlId: string}) {
  const data = await getData(urlId)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}