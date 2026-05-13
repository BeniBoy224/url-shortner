"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function TotalClicks({ total }: { total: number }) {
  

  const switchBetween = () => {

  }

  return (
    <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-3xl font-bold">{total.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">1,567 last month</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            <Button onClick={switchBetween}>View all time</Button>
          </div>
        </CardFooter>
      </Card>
  )
}