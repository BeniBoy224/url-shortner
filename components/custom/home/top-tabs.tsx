import { auth } from "@/lib/auth"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ShortenLink from "./shorten-link"

export async function TopTabs() {
  const session = await auth()
  let showTrackingInput = false

  if (!session?.user) { showTrackingInput = false } else showTrackingInput = true

  

  return (
    <Tabs defaultValue="default" className="w-100">
      <TabsList variant="line">
        <TabsTrigger value="default">Default</TabsTrigger>
        <TabsTrigger value="tracking">Tracking</TabsTrigger>
      </TabsList>
      <TabsContent value="default">
        <CardHeader>
          <CardTitle>Create a short link</CardTitle>
          <CardDescription>
            Create a short link for your long URL. Get a concise and shareable link that redirects to your original URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShortenLink tracking={false} userId={session?.user?.id || ""} />
        </CardContent>
      </TabsContent>
      <TabsContent value="tracking">
        <CardHeader>
          <CardTitle>Create a short link with tracking</CardTitle>
          <CardDescription>
            Create a short link for your long URL. Get a concise and shareable link that redirects to your original URL. Track the performance of your short links with detailed analytics, including click counts, geographic data, and referral sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {showTrackingInput ? (
            <ShortenLink tracking={true} userId={session?.user?.id || ""} />
          ) : (
            <div> Logged out </div>
          )}
        </CardContent>
      </TabsContent>
    </Tabs>
  )
}
