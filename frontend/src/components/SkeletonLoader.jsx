export default function SkeletonLoader() {
  return (
    <div className="flex flex-col items-center space-y-10 my-4 w-full h-full">
      <div className="w-[65%] flex items-center justify-around">
        <div className="animate-pulse bg-gray-200 w-28 h-28 rounded-full"></div>
        <div className="animate-pulse bg-gray-200 w-28 h-28 rounded-full"></div>
        <div className="animate-pulse bg-gray-200 w-28 h-28 rounded-full"></div>
        <div className="animate-pulse bg-gray-200 w-28 h-28 rounded-full"></div>
        <div className="animate-pulse bg-gray-200 w-28 h-28 rounded-full"></div>
      </div>

      <div className="flex flex-col bg-gray-100 w-[60%] h-full animate-pulse rounded-xl p-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-38 h-3 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>

        <div className="bg-gray-300 w-full h-full animate-pulse rounded-md"></div>
      </div>

      <div className="flex flex-col bg-gray-100 w-[60%] h-full animate-pulse rounded-xl p-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-gray-300 w-10 h-10 rounded-full"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-3 rounded-full"></div>
            <div className="animate-pulse bg-gray-300 w-38 h-3 rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="bg-gray-300 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-4/5 h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-full h-4 animate-pulse rounded-md"></div>
          <div className="bg-gray-300 w-2/4 h-4 animate-pulse rounded-md"></div>
        </div>

        <div className="bg-gray-300 w-full h-full animate-pulse rounded-md"></div>
      </div>
    </div>
  );
}
