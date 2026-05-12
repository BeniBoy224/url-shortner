interface IpApiResponse {
  status: "success" | "fail"
  country: string
  regionName: string
  city: string
}

export interface LocationData {
  country: string
  regionName: string
  city: string
}

const FALLBACK: LocationData = { country: "", regionName: "", city: "" }

export async function getLocation(ip: string): Promise<LocationData> {
  const normalized = ip?.startsWith("::ffff:") ? ip.slice(7) : ip

  if (!normalized || normalized === "unknown" || normalized === "::1" || normalized.startsWith("127.") || normalized.startsWith("192.168.")) {
    return FALLBACK
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${normalized}?fields=status,country,regionName,city`)
    const data: IpApiResponse = await res.json()

    if (data.status !== "success") return FALLBACK

    return { country: data.country, regionName: data.regionName, city: data.city }
  } catch {
    return FALLBACK
  }
}
