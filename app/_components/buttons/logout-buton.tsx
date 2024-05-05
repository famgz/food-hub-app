"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogOutButton({ text = "" }: { text?: string }) {
  return (
    <Button
      onClick={() => signOut()}
      variant="ghost"
      className="justify-start space-x-2"
    >
      <LogOutIcon size={20} />
      <span>{text}</span>
    </Button>
  );
}
