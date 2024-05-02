import { StarIcon } from "lucide-react";
import { cn } from "../_lib/utils";

interface RatingBadgeProps {
  theme: "dark" | "light";
  className?: string;
}

export default function RatingBadge({ theme, className }: RatingBadgeProps) {
  const colors = theme === "dark" ? " bg-gray-700 text-white " : " bg-white ";

  return (
    <div
      className={cn(
        "flex h-fit w-fit items-center gap-[2px] rounded-full px-[6px] py-[2px]",
        colors,
        className,
      )}
    >
      <StarIcon size={12} fill="#FFB100" color="#FFB100" />
      <span className="text-xs font-semibold">5.0</span>
    </div>
  );
}
