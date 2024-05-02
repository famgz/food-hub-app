import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

interface LikeButtonProps {
  iconSize: number; // or string, or whatever type you expect size to be
}

export default function LikeButton({ iconSize }: LikeButtonProps) {
  return (
    <Button
      size="icon"
      className="absolute right-2 top-2 size-8 rounded-full bg-gray-700"
    >
      <HeartIcon size={iconSize} fill="white" />
    </Button>
  );
}
