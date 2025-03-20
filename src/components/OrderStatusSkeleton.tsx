import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const OrderStatusSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gray-200 h-8 w-48 rounded animate-pulse"></div>
        <div className="bg-gray-200 h-10 w-32 rounded animate-pulse"></div>
      </div>
      
      {[1, 2].map((index) => (
        <div key={index} className="space-y-8 bg-white p-6 md:p-8 rounded-lg border border-gray-100 shadow-sm animate-pulse">
          {/* OrderStatusHeader skeleton */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 h-6 w-6 rounded-full"></div>
                <div className="bg-gray-200 h-7 w-40 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 h-5 w-5 rounded-full"></div>
                <div className="bg-gray-200 h-6 w-48 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
              <Progress className="h-2 bg-gray-200" value={30} />
            </div>
          </div>
          
          {/* OrderStatusDetail and Image skeleton */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* OrderStatusDetail skeleton */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 h-5 w-5 rounded-full"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="bg-gray-300 h-5 w-32 rounded"></div>
                  <div className="bg-gray-200 h-4 w-40 rounded"></div>
                  <div className="bg-gray-200 h-4 w-56 rounded"></div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 h-5 w-5 rounded-full"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="bg-gray-300 h-5 w-28 rounded"></div>
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between">
                      <div className="bg-gray-200 h-4 w-32 rounded"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="bg-gray-200 h-4 w-40 rounded"></div>
                      <div className="bg-gray-200 h-4 w-16 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center pt-2">
                <div className="bg-gray-300 h-5 w-16 rounded"></div>
                <div className="bg-gray-300 h-6 w-24 rounded"></div>
              </div>
            </div>
            
            {/* Image skeleton */}
            <div className="flex flex-col">
              <AspectRatio ratio={16 / 9} className="mb-3">
                <div className="bg-gray-200 rounded-lg h-full w-full"></div>
              </AspectRatio>
              <div className="flex items-center mt-3 gap-2">
                <div className="bg-gray-200 h-4 w-36 rounded"></div>
                <div className="bg-gray-200 h-4 w-4 rounded-full"></div>
                <div className="bg-gray-200 h-4 w-36 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusSkeleton;