import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartButton from "./buttons/cart-button";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Food Hub" height={30} width={100} />
      </Link>
      <div className="space-x-2">
        <CartButton />
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
        >
          <MenuIcon />
        </Button>
      </div>
    </div>
  );
}
