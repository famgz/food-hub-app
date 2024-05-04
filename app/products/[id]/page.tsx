import BackButton from "@/app/_components/buttons/back-button";
import { convertToPlainObject } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductDetails from "./_components/product-details";
import HomeButton from "@/app/_components/buttons/home-button";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  let product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
      category: true,
    },
  });

  product = convertToPlainObject(product);

  if (!product) {
    return notFound();
  }

  let category = (product?.category.name || "Sucos") as string;

  // other products from same restaurant/productCategory
  let extraProducts = await db.product.findMany({
    where: {
      category: {
        name: category,
      },
      restaurant: {
        id: product.restaurantId,
      },
    },
    include: {
      restaurant: true,
      category: true,
    },
    take: 10,
    distinct: "name",
  });

  extraProducts = convertToPlainObject(extraProducts);

  return (
    <div className="pb-5">
      {/* Product image */}
      <div className="relative h-[360px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        <BackButton />
        <div className="absolute right-4 top-4">
          <HomeButton />
        </div>
      </div>

      <div className="relative z-50 -mt-5 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background">
        <ProductDetails
          product={product}
          complementaryProducts={extraProducts}
        />
      </div>
    </div>
  );
}
