"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"

export function TopNav() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <div>
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">Link To</Link>
            </div>
            <div className="flex space-x-4">
              {session ? (
                <>
                  {pathname === "/dash" ? (
                    <Link href="/" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">Home</Link>
                  ) : (
                    <Link href="/dash" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">Dashboard</Link>
                  )}
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">Login</Link>
                  <Link href="/register" className="text-gray-800 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
