export default function Loading() {

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="space-y-3">

        <div className="h-10 w-72 bg-gray-200 rounded animate-pulse"></div>

        <div className="h-5 w-56 bg-gray-200 rounded animate-pulse"></div>

      </div>

      {/* Metrics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {[...Array(8)].map((_, index) => (

          <div

            key={index}

            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"

          >

            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-5"></div>

            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>

            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>

          </div>

        ))}

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>

        {[...Array(8)].map((_, index) => (

          <div

            key={index}

            className="flex justify-between items-center py-4 border-b"

          >

            <div className="space-y-2">

              <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>

              <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>

            </div>

            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>

          </div>

        ))}

      </div>

    </div>

  );

}