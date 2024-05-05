"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { convertToPlainObject } from "../utils";

export async function createOrder(data: Prisma.OrderCreateInput) {
  const order = await db.order.create({ data });
  return convertToPlainObject(order);
}
