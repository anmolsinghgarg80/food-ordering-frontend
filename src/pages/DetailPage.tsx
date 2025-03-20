import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import OrderSummary from "@/components/OrderSummary";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const getTotalCost = () => {
      const totalInRupees = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );

      const totalWithDelivery = totalInRupees + restaurant.deliveryPrice;

      return totalWithDelivery;
    };

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
      totalAmount: getTotalCost(),
    };

    createCheckoutSession(checkoutData);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col gap-8">
          <Skeleton className="h-64 w-full rounded-md" />
          <div className="grid md:grid-cols-[4fr_2fr] gap-5">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-8 w-48 rounded-md" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Skeleton key={item} className="h-24 w-full rounded-md" />
                ))}
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container mx-auto py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>
            We couldn't find the restaurant you're looking for. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-8">
        <div className="relative">
          <AspectRatio ratio={16 / 5}>
            <img
              src={restaurant.imageUrl}
              className="rounded-lg object-cover h-full w-full shadow-md"
              alt={restaurant.restaurantName}
            />
          </AspectRatio>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
              {restaurant.restaurantName}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-[4fr_2fr] gap-8">
          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <RestaurantInfo restaurant={restaurant} />
            </div>

            <div className="flex flex-col px-5 gap-4">
              <h2 className="text-2xl font-bold tracking-tight pl-2 border-l-4 border-orange-500">
                Menu
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurant.menuItems.map((menuItem, index) => (
                  <MenuItem
                    key={menuItem._id}
                    menuItem={menuItem}
                    addToCart={() => addToCart(menuItem)}
                    isEvenItem={index % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-4 self-start">
            <Card className="shadow-md border-0">
              <OrderSummary
                restaurant={restaurant}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
              <CardFooter className="border-t pt-4">
                <CheckoutButton
                  disabled={cartItems.length === 0}
                  onCheckout={onCheckout}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
