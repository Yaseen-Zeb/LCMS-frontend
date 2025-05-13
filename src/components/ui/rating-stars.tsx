// StarRating.tsx
import { useState } from "react";
import { Star, StarOff } from "lucide-react";

type StarRatingProps = {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  gap?: number;
  messages?: string[];
  className?: string;
  onSetRating?: (rating: number) => void;
};

export default function StarRating({
  maxRating = 5,
  defaultRating = 0,
  color = "#fcc419",
  size = 24,
  gap = 8,
  className = "",
  onSetRating = () => {},
}: StarRatingProps) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    onSetRating(rate);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", alignItems: "start", gap }}>
      <div style={{ display: "flex", gap }}>
        {Array.from({ length: maxRating }, (_, i) => {
          const isFilled = displayRating > i;

          return (
            <span
              key={i}
              onClick={() => handleRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              style={{ cursor: "pointer", color }}
            >
              {isFilled ? <Star fill={color} size={size} /> : <StarOff size={size} />}
            </span>
          );
        })}
      </div>
      {/* <p className="text-center" style={{ color, fontSize: size / 1.5, margin: 0 }}>
        {messages.length === maxRating ? messages[displayRating - 1] : displayRating || ""}
      </p> */}
    </div>
  );
}
