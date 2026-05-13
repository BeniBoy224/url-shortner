import TotalLinksTable from "@/components/custom/dash/tabels/click-timeline/click-timeline";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"

import { CopyButton } from "@/components/custom/dash/copy-button"
import TotalClicks from "@/components/custom/dash/total-clicks";
import { LocationChart } from "@/components/custom/dash/location-chart";
import { AlertEditUrl } from "@/components/custom/dash/alert-edit-url";
import Link from "next/link";
import { AlertDeleteUrl } from "@/components/custom/dash/alert-delete-url";

export default async function TrackedLinkPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const session = await auth()
  if (!session?.user) redirect("/login")

  const userId = session.user.id || ""

  const url = await prisma.url.findUnique({
    where: { id: slug },
    select: { userId: true, shortCode:true, originalUrl: true },
  })

  if (!url || url.userId !== session.user.id) redirect("/dash")

  const totalClicks = async () => {
    const urlDB = await prisma.url.findMany({
      where: { id: slug },
      select: { clicks: true },
    })

    let total = 0
    urlDB.forEach(element => {
      total += element.clicks
    })

    return total
  }

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
      <div>
        <div className="pb-3">
          <Link href="/dash">
            <Button>Back</Button>
          </Link>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex gap-3">
              <a href={baseUrl + "/" + url.shortCode} target="_blank" rel="noopener noreferrer">
                {baseUrl + "/" + url.shortCode}
              </a>
              <CopyButton text={baseUrl + "/" + url.shortCode} />
            </div>
            <div className="flex gap-3">
              <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                {url.originalUrl.length > 30 ? url.originalUrl.slice(0, 30) + "…" : url.originalUrl}
              </a>
              <AlertEditUrl urlId={slug} currentUrl={url.originalUrl} />
            </div>
          </div>
          <div>
            <AlertDeleteUrl urlId={slug}/>
          </div>
        </div>
        <section>
          <div className="grid grid-cols-2 gap-6">
            <LocationChart userId={userId} urlId={slug}/>
            <TotalClicks total={await totalClicks()}/>
          </div>
        </section>
        <section>
          <TotalLinksTable urlId={slug} />
        </section>
      </div>
    </div>
  )
}