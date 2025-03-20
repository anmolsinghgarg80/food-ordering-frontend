import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import OrderStatusSkeleton from "@/components/OrderStatusSkeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return <OrderStatusSkeleton />;
  }

  if (!orders || orders.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center h-96 text-center p-8 shadow-sm">
        <CardContent className="pt-6">
          <div className="bg-blue-50 p-4 rounded-full mb-4 mx-auto w-fit">
            <ShoppingBag className="h-12 w-12 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 max-w-md mb-6">
            Looks like you haven't placed any orders. Discover restaurants and
            start ordering delicious meals!
          </p>
          <Button
            onClick={() => navigate("/restaurants")}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
          >
            Browse Restaurants
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
        <Button
          variant="outline"
          onClick={() => navigate("/restaurants")}
          className="flex items-center gap-2"
        >
          Order More
          <ShoppingBag className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="overflow-hidden hover:shadow-md transition-shadow"
          >
            <CardContent className="p-0">
              <div className="p-6 space-y-3">
                <OrderStatusHeader order={order} />

                <AspectRatio ratio={16 / 9} className="mb-4">
                  <img
                    src={order.restaurant.imageUrl}
                    alt={order.restaurant.restaurantName}
                    className="rounded-lg object-cover h-full w-full shadow-sm"
                  />
                </AspectRatio>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-1">
                      Restaurant:
                    </span>
                    <span>{order.restaurant.restaurantName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 mr-1">
                      Order ID:
                    </span>
                    <span className="text-xs font-mono">
                      {order._id.substring(0, 8)}
                    </span>
                  </div>
                </div>

                <OrderStatusDetail order={order} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPage;
