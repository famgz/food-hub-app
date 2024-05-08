"use client";

import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { HeartIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { formatPrice } from "../_helpers/price";
import { cn } from "../_lib/utils";
import DeliveryIcon from "./icons/delivery-icon";
import RatingBadge from "./rating-badge";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { isRestaurantFavorite } from "../_helpers/restaurant";
import UseToggleFavoriteRestaurant from "../restaurants/_hooks/use-toggle-favorite-restaurant";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

export default function RestaurantItem({
  restaurant,
  userFavoriteRestaurants,
  className,
}: RestaurantItemProps) {
  const { data } = useSession();
  const userId = data?.user?.id;

  const isFavorite = isRestaurantFavorite(
    userFavoriteRestaurants,
    restaurant.id,
  );
  const { handleFavoriteClick } = UseToggleFavoriteRestaurant({
    userId,
    restaurantId: restaurant.id,
    isFavorite,
  });

  const deliveryFee = Number(restaurant.deliveryFee);

  return (
    <div className={cn("min-w-[266px] max-w-[266px]", className)}>
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-md">
        <Link href={`/restaurants/${restaurant.id}`}>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </Link>
        <div className="absolute left-2 top-2">
          <RatingBadge theme="light" />
        </div>
        {/* Like button */}
        {userId && (
          <Button
            size="icon"
            className={`absolute right-2 top-2 z-10 size-8 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
            onClick={async () => await handleFavoriteClick()}
          >
            <HeartIcon size={16} fill="white" />
          </Button>
        )}
      </div>

      <div>
        <h3 className="mt-2 truncate text-sm font-semibold">
          {restaurant.name}
        </h3>
        <div className="flex gap-3">
          {/* Delivery fee */}
          <div className="flex items-center gap-1">
            <DeliveryIcon className="" color="#EA1D2C" />
            <span className="text-xs text-muted-foreground">
              {deliveryFee === 0 ? "Entrega grátis" : formatPrice(deliveryFee)}
            </span>
          </div>

          {/* Delivery time */}
          <div className="flex items-center gap-1">
            <TimerIcon className="text-primary" size={8} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
