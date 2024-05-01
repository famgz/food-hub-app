import { ChevronRightIcon } from "lucide-react";
import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";
import { Button } from "./ui/button";

export default async function CategoryList() {
  const categories = await db.category.findMany();

  return (
    <div className="section-scroll">
      {categories.map((c) => (
        <CategoryItem key={c.id} category={c} />
      ))}
    </div>
  );
}
