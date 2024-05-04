import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HomeButton() {
  return (
    <Button
      asChild
      className="rounded-full bg-white text-foreground hover:text-white"
      size="icon"
    >
      <Link href="/">
        <HomeIcon size={20} />
      </Link>
    </Button>
  );
}
