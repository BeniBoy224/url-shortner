"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"

export function CopyButton({ text }: { text: string }) {
  return (
    <button onClick={() => {
      navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    }}>
      <Copy size={14} />
    </button>
  )
}
