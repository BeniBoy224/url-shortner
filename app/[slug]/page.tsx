import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma";

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
  const { slug } = await props.params

  const url = await prisma.url.findUnique({
    where: {
      shortCode: slug
    }
  })

  if (!url) {
    return <div className="text-center text-2xl font-semibold">Link not found</div>
  }

  await prisma.url.update({
    where: {
      shortCode: slug
    },
    data: {
      clicks: {
        increment: 1
      }
    }
  })

  redirect(url.originalUrl)
}