import { Restaurant } from "@prisma/client";
import {
  ArrowDownIcon,
  BikeIcon,
  HeartIcon,
  StarIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "../_helpers/price";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: RestaurantItemProps) {
  const deliveryFee = Number(restaurant.deliveryFee);

  return (
    <div className="min-w-[266px] max-w-[266px]">
      <div className="relative h-[150px] w-full overflow-hidden rounded-lg shadow-md">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        {/* Rating badge */}
        <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white px-[6px] py-[2px] ">
          <StarIcon size={12} fill="#FFB100" color="#FFB100" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
        {/* Like button */}
        <Button
          size="icon"
          className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-600 "
        >
          <HeartIcon size={16} fill="white" />
        </Button>
      </div>

      <div>
        <h3 className="mt-2 truncate text-sm font-semibold">
          {restaurant.name}
        </h3>
        <div className="flex gap-3">
          {/* Delivery fee */}
          <div className="flex items-center gap-1">
            <Image
              src="/delivery-icon.svg"
              alt="delivery bike icon"
              height={16}
              width={16}
              className="text-primary"
            />
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
    </div>
  );
}
