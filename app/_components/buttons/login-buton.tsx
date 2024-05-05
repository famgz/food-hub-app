"use client";

import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogInButton({
  text = "",
  size = "default",
}: {
  text?: string;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) {
  function handleLogInClick() {
    signIn();
  }

  return (
    <Button size={size} onClick={handleLogInClick} className="min-w-fit gap-1">
      {!!text && text}
      <LogInIcon size={20} />
    </Button>
  );
}
