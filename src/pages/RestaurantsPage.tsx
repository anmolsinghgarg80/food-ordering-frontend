import { useGetAllRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultCard from "@/components/SearchResultCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export type getAllRestaurantsState = {
  page: number;
  sortOption: string;
}

const RestaurantsPage = () => {
  const [getAllRestaurantState, setGetAllRestaurantState] = useState<getAllRestaurantsState>({
    page: 1,
    sortOption: "bestMatch",
  });

  const setPage = (page: number) => {
    setGetAllRestaurantState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSortOption = (sortOption: string) => {
    setGetAllRestaurantState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const { results, isLoading } = useGetAllRestaurants(getAllRestaurantState);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between flex-col gap-3 lg:flex-row">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4"
            >
              <Skeleton className="h-32 w-32 rounded-md" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="w-full md:w-32 space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <div className="flex gap-2">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-10 w-10 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!results?.data || results.data.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Restaurants Found</h2>
          <p className="text-gray-600">We couldn't find any restaurants at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between flex-col gap-3 lg:flex-row items-center">
          <div className="text-xl font-bold text-gray-800">
            Showing all restaurants <span className="text-orange-500">({results.pagination.total})</span>
          </div>
          <SortOptionDropdown
            sortOption={getAllRestaurantState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, index) => (
          <div 
            key={restaurant._id || index} 
            className={`p-4 rounded-lg shadow-sm ${index % 2 === 0 ? 'bg-gray-100' : 'bg-slate-100'}`}
          >
            <SearchResultCard restaurant={restaurant} />
          </div>
        ))}
        
        <div className="mt-4">
          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;