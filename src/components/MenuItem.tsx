import type { MenuItem as MenuItemType } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

type Props = {
  menuItem: MenuItemType;
  addToCart: () => void;
  isEvenItem?: boolean;
};

const MenuItem = ({ menuItem, addToCart, isEvenItem = false }: Props) => {
  return (
    <Card
      className={`transition-all duration-300 border-0 ${
        isEvenItem ? "bg-white" : "bg-gray-50"
      }`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span className="truncate pr-2">{menuItem.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-orange-600">
            ₹{menuItem.price.toFixed(2)}
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-1"
          >
            <PlusCircle className="size-5" />
            <span>Add</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
