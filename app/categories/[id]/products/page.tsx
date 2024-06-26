import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { plainify } from "@/app/_helpers/utils";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default async function CategoryPage({
  params: { id },
}: CategoryPageProps) {
  let category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
        distinct: "name",
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  category = plainify(category);

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid w-full grid-cols-2  gap-6 ">
          {category.products.map((p) => (
            <ProductItem key={p.id} product={p} className="min-w-full" />
          ))}
        </div>
      </div>
    </>
  );
}
