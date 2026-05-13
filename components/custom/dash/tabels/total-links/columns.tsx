"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TotalLinks = {
  id: string
  original_link: string
  status: "Active" | "Inactive"
  tracked_link: string
  clicks: string
}

export const columns: ColumnDef<TotalLinks>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "tracked_link",
    header: "Tracked Link",
    cell: ({ row }) => {
      const link = `/dash/tracked-link/${row.original.id}`
      return (
        <a href={link} rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.original.tracked_link}
        </a>
      )
    }
  },
  {
    accessorKey: "original_link",
    header: "Original Link",
  },
  {
    accessorKey: "clicks",
    header: "Total Clicks"
  },
]