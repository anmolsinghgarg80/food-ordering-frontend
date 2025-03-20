import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type checkoutData = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
  totalAmount: number;
};

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async ():Promise<Order[]> => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest
  );
  return { orders, isLoading };
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (checkoutData: checkoutData) => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/order/checkout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  };
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createCheckoutSessionRequest);

  if (isSuccess) {
    toast.success("Order created successfully");
  }
  if (error) {
    toast.error("Failed to create order");
  }

  return { createCheckoutSession, isLoading };
};
