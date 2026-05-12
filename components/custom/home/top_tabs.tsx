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
import ShortenLink from "./shorten_link"

export function TopTabs() {
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
          <ShortenLink />
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
          
        </CardContent>
      </TabsContent>
    </Tabs>
  )
}
