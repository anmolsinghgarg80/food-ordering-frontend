import { getAllRestaurantsState } from "@/pages/RestaurantsPage";
import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse, RestaurantType } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<RestaurantType> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/${restaurantId}`
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      throw error;
    }
  };
  const { data: restaurant, isLoading } = useQuery(
    ["fetchRestaurant", restaurantId], // Dynamic key
    getRestaurantByIdRequest,
    { enabled: !!restaurantId }
  );
  

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.SearchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState, city],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetAllRestaurants = (
  getAllRestaurantsState: getAllRestaurantsState,
) => {
  const createGetAllRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("page", getAllRestaurantsState.page.toString());
    params.set("sortOption", getAllRestaurantsState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["getAllRestaurants", getAllRestaurantsState],
    createGetAllRequest,
  );

  return {
    results,
    isLoading,
  };
};
