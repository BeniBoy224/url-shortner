"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

type Props = {
  userId: string
  urlId?: string
}

export function LocationChart({ userId, urlId }: Props) {
  const [chartData, setChartData] = useState<{ country: string; clicks: number }[]>([])

  useEffect(() => {
    fetch("/api/stats/top-countrys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...(urlId ? { urlId } : {}) }),
    })
      .then((res) => res.json())
      .then((json) => setChartData(json.data ?? []))
  }, [userId, urlId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Countries</CardTitle>
        <CardDescription>Clicks by country</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="clicks" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="clicks" fill="var(--color-clicks)" radius={4}>
              <LabelList
                dataKey="country"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="clicks"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
