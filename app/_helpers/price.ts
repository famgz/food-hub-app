import { Prisma } from "@prisma/client";

export function calculateProductTotalPrice(
  price: Prisma.Decimal | number,
  discountPercentage: Prisma.Decimal | number,
): number {
  price = Number(price);
  discountPercentage = Number(discountPercentage);

  if (discountPercentage === 0) {
    return price;
  }
  discountPercentage = price * (discountPercentage / 100);
  return Number(price) - discountPercentage;
}

export function formatPrice(price: Prisma.Decimal | number) {
  price = Number(price);
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number(price));
}
