import { Order } from "@/types";
import { Separator } from "./ui/separator";
import { MapPin, Package } from "lucide-react";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-6 bg-gray-50 px-6 py-3 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 mb-1">Delivering to:</span>
            <span className="text-gray-700">{order.deliveryDetails.name}</span>
            <span className="text-gray-600">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-gray-800 mb-1">Your Order</span>
            <ul className="space-y-2">
              {order.cartItems.map((item, index) => (
                <li key={index} className="flex justify-between text-gray-700">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex justify-between items-center pt-2">
        <span className="font-bold text-gray-800">Total</span>
        <span className="text-xl font-bold text-orange-600">
          ₹{order.totalAmount.toFixed(2)}
        </span>
      </div>

      {order.status === "delivered" && (
        <div className="bg-green-50 p-3 rounded-lg text-center text-green-700 text-sm font-medium border border-green-100">
          Thank you for your order!
        </div>
      )}
    </div>
  );
};

export default OrderStatusDetail;
