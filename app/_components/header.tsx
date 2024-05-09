import Image from "next/image";
import Link from "next/link";
import CartButton from "./buttons/cart-button";
import SideMenu from "./side-menu";
import { db } from "../_lib/prisma";
import { plainify } from "../_helpers/utils";

export default async function Header() {
  let categories = await db.category.findMany();

  categories = plainify(categories);

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Food Hub" height={30} width={100} />
      </Link>
      <div className="space-x-2">
        <CartButton />
        <SideMenu categories={categories} />
      </div>
    </div>
  );
}
