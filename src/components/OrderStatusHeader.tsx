import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Clock, CheckCircle, TruckIcon } from "lucide-react";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);

    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  const statusInfo = getOrderStatusInfo();
  
  // Function to get appropriate icon based on status
  const getStatusIcon = () => {
    switch (statusInfo.value) {
      case "delivered":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "outForDelivery":
        return <TruckIcon className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-2xl font-bold text-gray-800">
            {statusInfo.label}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="h-5 w-5" />
          <span className="text-lg font-semibold">
            Expected by: {getExpectedDelivery()}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Order Placed</span>
          <span>In Progress</span>
          <span>Out for Delivery</span>
          <span>Delivered</span>
        </div>
        <Progress
          className="h-2"
          value={statusInfo.progressValue}
          // Add dynamic color based on status
          style={{
            backgroundColor: 'rgb(229, 231, 235)',
            '--progress-color': statusInfo.progressValue === 100 ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)',
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default OrderStatusHeader;