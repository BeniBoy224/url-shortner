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
import { deleteUrl } from "@/app/actions/url"
import { Button } from "@/components/ui/button";

export function AlertDeleteUrl({ urlId }: { urlId: string }) {
  const handleSubmit = async () => {
    try {
      await deleteUrl(urlId)
    } catch (error) {
      console.error("Error deleting URL:", error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
          <Button type="submit" variant="destructive">Delete URL</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete URL</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this URL? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" type="submit" onClick={handleSubmit}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
