import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <>
            <Link
              to="/all-restaurants"
              className="font-bold hover:text-orange-500"
            >
              All Restaurants
            </Link>
            <Link
              to="/order-status"
              className="font-bold hover:text-orange-500"
            >
              Order Status
            </Link>
            <UsernameMenu />
          </>
        ) : (
          <>
            <Link
              to="/all-restaurants"
              className="font-bold hover:text-orange-500"
            >
              All Restaurants
            </Link>
            <Button
              variant="ghost"
              className="text-xl font-bold hover:text-orange-500 hover:bg-white"
              onClick={async () => await loginWithRedirect()}
            >
              Log In
            </Button>
          </>
        )}
      </span>
    </>
  );
}

export default MainNav;
