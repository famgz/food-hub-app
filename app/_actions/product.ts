"use server";

import { db } from "@/app/_lib/prisma";
import { plainify } from "../_helpers/utils";

export async function getProduct(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: true,
      category: true,
    },
  });
  return plainify(product);
}
