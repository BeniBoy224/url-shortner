"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GEO_URL = "/world-countries.json"

interface Props {
  data: { country: string; clicks: number }[]
}

function getColor(clicks: number, max: number): string {
  if (clicks === 0) return "#e5e7eb"
  const t = Math.sqrt(clicks / max)
  const r = Math.round(191 + t * (29 - 191))
  const g = Math.round(219 + t * (78 - 219))
  const b = Math.round(254 + t * (216 - 254))
  return `rgb(${r},${g},${b})`
}

export function WorldMap({ data }: Props) {
  const [zoom, setZoom] = useState(1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState<{ country: string; clicks: number } | null>(null)

  const clickMap = new Map(data.map((d) => [d.country, d.clicks]))
  const max = Math.max(...data.map((d) => d.clicks), 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clicks by Location</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <div
          className="relative"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
          }}
        >
          {/* Zoom controls */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
            <button
              onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}
              className="w-8 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              +
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
              className="w-8 h-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              -
            </button>
          </div>

          {/* Tooltip */}
          {hovered && (
            <div
              className="absolute z-20 pointer-events-none bg-gray-900 text-white text-sm px-3 py-1.5 rounded-sm shadow-lg"
              style={{ left: mousePos.x + 12, top: mousePos.y - 36 }}
            >
              {hovered.country}:{" "}
              <span className="font-bold">{hovered.clicks.toLocaleString()}</span>
            </div>
          )}

          <ComposableMap
            projectionConfig={{ scale: 147 }}
            width={800}
            height={400}
            style={{ width: "100%", height: "auto" }}
          >
            <ZoomableGroup zoom={zoom} minZoom={1} maxZoom={8}>
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const clicks = clickMap.get(geo.properties.name) ?? 0
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getColor(clicks, max)}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            fill: clicks > 0 ? "#2563eb" : "#d1d5db",
                            outline: "none",
                          },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={() =>
                          setHovered({ country: geo.properties.name, clicks })
                        }
                        onMouseLeave={() => setHovered(null)}
                      />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </CardContent>
    </Card>
  )
}
