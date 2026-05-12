"use client"
import { useRef, useState } from "react"

export default function ShortenLink() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [ shortUrl, setShortUrl] = useState<string>("")
  
  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = btnRef.current
    if (!btn) return
    const { left, top, width, height } = btn.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    btn.style.background = `radial-gradient(ellipse 150% 150% at ${x}% ${y}%, #93c5fd 0%, #3b82f6 35%, #7c3aed 100%)`
  }

  function handleMouseLeave() {
    const btn = btnRef.current
    if (!btn) return
    btn.style.background = "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)"
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const originalUrl = formData.get("originalUrl") as string
    
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ originalUrl })
      })
      
      const data = await response.json()
      setShortUrl(data.shortUrl)
    } catch (error) {
      console.error("Error shortening URL:", error)
      alert("Failed to shorten URL. Please try again.")
    }
  }

  return (
        <section className="max-w-md mx-auto">
          <form className="flex gap-4 w-full mt-8" onSubmit={handleSubmit}>
            <input type="text" name="originalUrl" placeholder="Enter a long URL..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button
              ref={btnRef}
              type="submit"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="text-white font-bold py-2 px-4 rounded-md"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)"
              }}
            >
              Shorten
            </button>
          </form>

          {shortUrl && (
            <div className="mt-4">
              <p className="text-lg font-semibold">Your short URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {shortUrl}
              </a>
            </div>
          )}
        </section>
  
  )
}