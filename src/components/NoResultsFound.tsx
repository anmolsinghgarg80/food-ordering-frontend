import { Search, XCircle } from "lucide-react";

type NoResultsFoundProps = {
  searchQuery?: string;
  city?: string;
};

const NoResultsFound = ({ searchQuery, city }: NoResultsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
      <div className="relative">
        <Search size={64} className="text-orange-500" />
        <XCircle
          size={32}
          className="text-orange-600 absolute bottom-0 right-0"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">No Restaurants Found</h2>

      <p className="text-gray-600 max-w-md">
        {searchQuery && city
          ? `We couldn't find any restaurants matching "${searchQuery}" in ${city}.`
          : city
          ? `We couldn't find any restaurants in ${city}.`
          : "No results found. Please try a different search."}
      </p>

      <div className="mt-2 text-gray-600">
        <p>Try:</p>
        <ul className="mt-2">
          <li>• Checking your spelling</li>
          <li>• Using more general keywords</li>
          <li>• Trying a nearby city or location</li>
          <li>• Removing cuisine filters</li>
        </ul>
      </div>
    </div>
  );
};

export default NoResultsFound;
