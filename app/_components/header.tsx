import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.svg" alt="Food Hub" height={30} width={100} />
      </Link>
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
