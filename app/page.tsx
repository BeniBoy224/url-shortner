import { TopTabs } from "@/components/custom/home/top_tabs";


export default function Home() {
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

        <TopTabs />
      </main>
    </div>
  );
}
