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
import { Pencil } from "lucide-react"

export function AlertEditUrl() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button><Pencil size={14} /></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit</AlertDialogTitle>
          <AlertDialogDescription>
            Update the destination URL for this tracked link. This will not change the short URL, but will update where it redirects to.
          </AlertDialogDescription>
          <form>
            <input placeholder="test"></input>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
