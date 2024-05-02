"use server";

import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";

export async function searchForRestaurant(search: string) {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return convertToPlainObject(restaurants);
}
