import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCard from "@/components/OrderItemCard";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant();

  const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  if (isGetLoading) {
    return (
      <div className="bg-white rounded-lg p-8 max-w mx-auto">
        <Skeleton className="h-10 w-2/3 mb-8" />

        <div className="space-y-6">
          {/* Restaurant Details Section */}
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-9 w-full" />
            </div>
          </div>

          {/* Cuisines Section */}
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-9 w-full" />
              ))}
            </div>
          </div>

          {/* Menu Items Section */}
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <Skeleton className="h-9 w-full mt-4" />
              </div>
            ))}
            <Skeleton className="h-9 w-36 mt-4" />
          </div>

          {/* Image Upload Section */}
          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-36 w-full rounded-md" />
              <Skeleton className="h-36 w-full rounded-md" />
              <Skeleton className="h-36 w-full rounded-md" />
            </div>
          </div>

          {/* Submit Button */}
          <Skeleton className="h-9 w-full max-w-xs mt-8" />
        </div>
      </div>
    );
  }

  if(isOrdersLoading) {
    return <Skeleton className="h-96 w-full rounded-md" />
  }

  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
