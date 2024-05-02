import { Restaurant } from "@prisma/client";
import { HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../_helpers/price";
import { Button } from "./ui/button";
import LikeButton from "./like-button";
import RatingBadge from "./rating-badge";
import DeliveryIcon from "./icons/delivery-icon";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

export default function RestaurantItem({
  restaurant,
  className,
}: RestaurantItemProps) {
  const deliveryFee = Number(restaurant.deliveryFee);

  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className={cn("min-w-[266px] max-w-[266px]", className)}
    >
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-md">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <div className="absolute left-2 top-2">
          <RatingBadge theme="light" />
        </div>
        <LikeButton iconSize={16} />
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
            <TimerIcon className="text-primary" size={16} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
