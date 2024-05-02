import BackButton from "@/app/_components/back-button";
import LikeButton from "@/app/_components/like-button";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";
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
    <div className="">
      {/* Product image */}
      <div className="relative h-[250px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
        />
        <BackButton />
        <LikeButton iconSize={20} className="right-4 top-4 size-10 p-2" />
      </div>

      <div className="relative z-50 -mt-5 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background">
        <RestaurantDetails restaurant={restaurant} />
      </div>
    </div>
  );
}
