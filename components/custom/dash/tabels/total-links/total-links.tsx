import { prisma } from "@/lib/prisma"
import { columns, TotalLinks } from "./columns"
import { DataTable } from "./data-table"

async function getData(userId: string): Promise<TotalLinks[]> {
  const urls = await prisma.url.findMany({
    where: { userId },
    select: { id: true, originalUrl: true, shortCode: true, clicks: true },
  })

  return urls.map((url) => ({
    id: url.id,
    original_link: url.originalUrl,
    tracked_link: url.shortCode,
    clicks: String(url.clicks),
    status: "Active" as const,
  }))
}

export default async function TotalLinksTable({userId}: {userId: string}) {
  const data = await getData(userId)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}