"use server"

import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function registerUser(username: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) return { error: "Username is already taken." }

  const hashed = await bcrypt.hash(password, 12)
  await prisma.user.create({ data: { username, password: hashed } })

  return { success: true }
}
