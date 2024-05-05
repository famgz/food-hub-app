"use client";

import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOutButton({ text = "" }: { text?: string }) {
  function handleLogOutClick() {
    signOut();
  }

  return (
    <Button
      onClick={handleLogOutClick}
      variant="ghost"
      className="justify-start space-x-2"
    >
      <LogOutIcon size={20} />
      <span>{text}</span>
    </Button>
  );
}
