import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultCard from "@/components/SearchResultCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import CuisineFilter from "@/components/CuisineFilter";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import NoResultsFound from "@/components/NoResultsFound";

export type SearchState = {
  SearchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    SearchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      SearchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      SearchQuery: "",
      page: 1,
    }));
  };

  const [isExpanded, setisExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
          <div className="bg-white rounded-lg p-4">
            <Skeleton className="h-8 w-full mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-6 w-full" />
              ))}
            </div>
          </div>
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          <div className="bg-white rounded-lg p-4">
            <Skeleton className="h-12 w-full" />
          </div>
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

  if (!results?.data || !city || results.data.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
          <CuisineFilter
            selectedCuisines={searchState.selectedCuisines}
            onChange={setSelectedCuisines}
            isExpanded={isExpanded}
            onExpandedClick={() =>
              setisExpanded((prevIsExpaned) => !prevIsExpaned)
            }
          />
        </div>
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar
            searchQuery={searchState.SearchQuery}
            onSubmit={setSearchQuery}
            placeHolder="Search by Cuisines or Restaurant Name"
            onReset={resetSearch}
          />
          <NoResultsFound searchQuery={searchState.SearchQuery} city={city} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() =>
            setisExpanded((prevIsExpaned) => !prevIsExpaned)
          }
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.SearchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisines or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>

        {results.data.map((restaurant, index) => (
          <div
            key={restaurant._id || index}
            className={`p-4 rounded-lg shadow-sm ${
              index % 2 === 0 ? "bg-gray-100" : "bg-slate-100"
            }`}
          >
            <SearchResultCard restaurant={restaurant} />
          </div>
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
