import ApiResponseError from "@/components/shared/api-response-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/ui/loader";
import formatDate from "@/utils/formatDate";
import { useGetLawyerReviews } from "../api/api-queries";
import { useParams } from "react-router-dom";
import NoDataFound from "@/components/shared/no-data-found";
import { env } from "@/config/env";
import { Star } from "lucide-react";

const MAX_STARS = 5;

const LawyerReviews = () => {
  const { id } = useParams();

  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useGetLawyerReviews(Number(id));

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ApiResponseError msg={(error as Error).message} />;
  }

  if (!reviews.data.length) {
    return <NoDataFound />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-medium">Reviews</h3>
      </div>

      <div className="space-y-4">
        {reviews.data.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 shadow-sm bg-white flex gap-4"
          >
            <Avatar>
              <AvatarImage
                src={
                  env.VITE_APP_BASE_URL + "/" + review.client.profile_picture
                }
                alt={review.client.name}
              />
              <AvatarFallback>
                {review.client.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-semibold text-gray-800">
                  {review.client.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-1">
                {Array.from({ length: MAX_STARS }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    strokeWidth={1.5}
                    className={
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-gray-700">{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LawyerReviews;
