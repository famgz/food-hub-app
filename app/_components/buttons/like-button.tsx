import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../_lib/utils";

interface LikeButtonProps {
  iconSize: number;
  className?: string;
}

export default function LikeButton({ iconSize, className }: LikeButtonProps) {
  return (
    <Button
      size="icon"
      className={cn(
        "absolute right-2 top-2 size-8 rounded-full bg-gray-700 ",
        className,
      )}
    >
      <HeartIcon size={iconSize} fill="white" />
    </Button>
  );
}
