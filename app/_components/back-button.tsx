"use client";

import { ChevronLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <Button
      className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      size="icon"
      onClick={handleBackClick}
    >
      <ChevronLeftIcon />
    </Button>
  );
}
