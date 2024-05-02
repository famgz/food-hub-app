import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex min-w-fit items-center gap-3 rounded-full bg-white px-4 py-3 shadow-md"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
}
