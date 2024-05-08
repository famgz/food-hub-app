"use client";

import { Restaurant } from "@prisma/client";
import UseToggleFavoriteRestaurant from "../../_hooks/use-toggle-favorite-restaurant";
import Image from "next/image";
import BackButton from "@/app/_components/buttons/back-button";
import { Button } from "@/app/_components/ui/button";
import { HeartIcon } from "lucide-react";

interface RestaurantImageProps {
  restaurant: Restaurant;
  userId?: string;
  isFavorite: boolean;
}

export default function RestaurantImage({
  restaurant,
  userId,
  isFavorite,
}: RestaurantImageProps) {
  const { handleFavoriteClick } = UseToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId,
    isFavorite,
  });

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <BackButton />

      {userId && (
        <Button
          size="icon"
          className={`absolute right-4 top-4 z-10 size-10 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
          onClick={async () => await handleFavoriteClick()}
        >
          <HeartIcon size={20} fill="white" />
        </Button>
      )}
    </div>
  );
}
