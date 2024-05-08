"use server";

import { db } from "@/app/_lib/prisma";
import { convertToPlainObject } from "../_helpers/utils";

export async function getProduct(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: true,
      category: true,
    },
  });
  return convertToPlainObject(product);
}
