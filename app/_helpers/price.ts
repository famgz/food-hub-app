import { Product } from "@prisma/client";

export function calculateProductTotalPrice(product: Product): number {
  const price = Number(product.price);
  let discount = Number(product.discountPercentage);

  if (product.discountPercentage === 0) {
    return price;
  }
  discount = price * (product.discountPercentage / 100);
  return Number(price) - discount;
}

export function formatPrice(price: number) {
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number(price));
}
