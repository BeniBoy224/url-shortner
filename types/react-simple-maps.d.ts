declare module "react-simple-maps" {
  import type React from "react"
  import type { ReactNode, MouseEvent, SVGProps } from "react"

  interface Geo {
    rsmKey: string
    properties: Record<string, string>
    [key: string]: unknown
  }

  interface GeographyStyleEntry {
    fill?: string
    outline?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
    cursor?: string
  }

  interface GeographyStyle {
    default?: GeographyStyleEntry
    hover?: GeographyStyleEntry
    pressed?: GeographyStyleEntry
  }

  export function ComposableMap(props: {
    projectionConfig?: Record<string, unknown>
    width?: number
    height?: number
    className?: string
    style?: React.CSSProperties
    children: ReactNode
  }): JSX.Element

  export function ZoomableGroup(props: {
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    onMoveEnd?: (pos: { zoom: number; coordinates: [number, number] }) => void
    children: ReactNode
  }): JSX.Element

  export function Geographies(props: {
    geography: string | object
    children: (args: { geographies: Geo[] }) => ReactNode
  }): JSX.Element

  export function Geography(props: {
    geography: Geo
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: GeographyStyle
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void
  }): JSX.Element
}
