import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0118] p-8">
      <div className="container mx-auto">
        <Skeleton className="h-12 w-64 mb-4 bg-purple-800/40" />
        <Skeleton className="h-6 w-96 mb-8 bg-purple-800/40" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-purple-800/40" />
                  <Skeleton className="h-7 w-32 bg-purple-800/40" />
                </div>
                <Skeleton className="h-10 w-20 bg-purple-800/40 mb-2" />
                <Skeleton className="h-5 w-36 bg-purple-800/40" />
              </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-purple-900/20 rounded-lg p-6 border border-purple-800">
                <div className="flex justify-between mb-4">
                  <Skeleton className="h-7 w-40 bg-purple-800/40" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20 bg-purple-800/40" />
                    <Skeleton className="h-5 w-20 bg-purple-800/40" />
                  </div>
                </div>
                <Skeleton className="h-[300px] w-full bg-purple-800/40 rounded-md" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

