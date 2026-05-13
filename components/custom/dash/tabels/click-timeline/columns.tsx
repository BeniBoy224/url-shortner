"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ClickTimeline = {
  click_time: Date
  country: string | null
  city: string | null
  region_name: string | null
}

export const columns: ColumnDef<ClickTimeline>[] = [
  {
    accessorKey: "click_time",
    header: "Time",
    cell: ({ getValue }) =>
      new Date(getValue<Date>()).toLocaleString("en-UK", { timeZone: "UTC" }),
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "region_name",
    header: "Region",
  },
]