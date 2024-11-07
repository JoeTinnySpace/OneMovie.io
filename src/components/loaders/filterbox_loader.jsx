// FilterBoxLoader.js

export const  FilterBoxLoader = () => {
  return (
    <div className="absolute top-16 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 max-w-sm w-full animate-pulse">
      {/* Header Placeholder */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Filter Options Placeholder */}
      <div className="space-y-4">
        {/* Sort By Placeholder */}
        <div>
          <div className="block h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Genres Placeholder */}
        <div>
          <div className="block h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="px-3 py-1 h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="px-3 py-1 h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Minimum Rating Placeholder */}
        <div>
          <div className="block h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Release Year Placeholder */}
        <div>
          <div className="block h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

