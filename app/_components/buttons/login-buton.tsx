"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { LogInIcon } from "lucide-react";

export default function LogInButton({ text = "" }: { text?: string }) {
  return (
    <Button size="icon" onClick={() => signIn()}>
      {text}
      <LogInIcon size={20} />
    </Button>
  );
}
