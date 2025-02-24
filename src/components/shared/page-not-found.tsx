import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import GoBackButton from "./go-back";

const PageNotFound = () => {
  return (
    <main className="grid place-items-center">
      <section>
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div>
            <p className="text-sm font-medium text-blue-500">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              We can’t find that page
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for doesn't exist or has been
              moved.
            </p>

            <div className="flex items-center mt-6 gap-4">
              <GoBackButton />
              <Link to="/">
                <Button variant="outline" className="h-8">
                  Home Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;
