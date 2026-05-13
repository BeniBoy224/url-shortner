"use server"

import { redirect } from "next/navigation"

export default async function TrackedLinkRedirectHome() {
  redirect("/dash")
}