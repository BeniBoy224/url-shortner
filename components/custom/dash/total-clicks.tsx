"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TotalClicks({ total }: { total: number }) {
  return (
    <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-3xl font-bold">{total.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
  )
}