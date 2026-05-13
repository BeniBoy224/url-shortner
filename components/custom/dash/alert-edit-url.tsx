"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { updateUrl } from "@/app/actions/url"
import { Pencil } from "lucide-react"

const FORM_ID = "edit-url-form"

export function AlertEditUrl({ urlId, currentUrl }: { urlId: string; currentUrl: string }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const destinationUrl = formData.get("destinationUrl") as string
    try {
      await updateUrl(urlId, destinationUrl)
    } catch (error) {
      console.error("Error updating URL:", error)
      alert("Failed to update URL. Please try again.")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <Pencil size={14} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit</AlertDialogTitle>
          <AlertDialogDescription>
            Update the destination URL for this tracked link. This will not change the short URL, but will update where it redirects to.
          </AlertDialogDescription>
          <form id={FORM_ID} onSubmit={handleSubmit} className="w-full">
            <input name="destinationUrl" placeholder="https://example.com" defaultValue={currentUrl} className="w-full border rounded-sm p-2" />
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" form={FORM_ID}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
