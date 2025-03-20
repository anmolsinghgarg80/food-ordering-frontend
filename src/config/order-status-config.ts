import { OrderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Placed", value: "placed", progressValue: 5 },
  { label: "In Progress", value: "inProgress", progressValue: 33 },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 66 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
