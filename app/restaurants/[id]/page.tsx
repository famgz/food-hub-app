import BackButton from "@/app/_components/buttons/back-button";
import { Button } from "@/app/_components/ui/button";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import RestaurantDetails from "./_components/restaurant-details";

interface RestaurantPage {
  params: {
    id: string;
  };
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPage) {
  let restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: true,
      products: {
        include: {
          restaurant: true,
          category: true,
        },
      },
    },
  });

  restaurant = convertToPlainObject(restaurant);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="pb-20">
      {/* Product image */}
      <div className="relative h-[250px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <BackButton />

        {/* {userId && ( */}
        <Button
          size="icon"
          className="absolute right-4 top-4 z-10 size-10 rounded-full bg-gray-700 p-2"
          // onClick={async () => await handleFavoriteClick()}
        >
          <HeartIcon size={20} fill="white" />
        </Button>
        {/* )} */}
      </div>

      <div className="relative z-50 -mt-5 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background">
        <RestaurantDetails restaurant={restaurant} />
      </div>
    </div>
  );
}
