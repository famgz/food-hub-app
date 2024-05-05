"use client";

import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogInButton({ text = "" }: { text?: string }) {
  function handleLogInClick() {
    signIn();
  }

  return (
    <Button size="icon" onClick={handleLogInClick}>
      <span>{text}</span>
      <LogInIcon size={20} />
    </Button>
  );
}
