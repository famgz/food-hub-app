"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { revalidatePath } from "next/cache";

export async function createOrder(data: Prisma.OrderCreateInput) {
  const order = await db.order.create({ data });
  revalidatePath("/my-orders"); // clean route cache to always update items
  return convertToPlainObject(order);
}
