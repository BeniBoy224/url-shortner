"use client"

export default function Home() {
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
      alert(`Short URL: ${data.shortUrl}`)
    } catch (error) {
      console.error("Error shortening URL:", error)
      alert("Failed to shorten URL. Please try again.")
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16  sm:items-start">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Link To
          </h1>
          <h3 className="text-xl text-gray-600 dark:text-gray-400">
            Create short links and tracking for your long URLs
          </h3>
        </div>

        <section>
          <form className="flex gap-4 w-full mt-8" onSubmit={handleSubmit}>
            <input type="text" name="originalUrl" placeholder="Enter a long URL..." className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
              Shorten
            </button>
          </form>
        </section>

      </main>
    </div>
  );
}
