"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    if (!search) return;
    e.preventDefault();
    router.push(`/restaurants?search=${search}`);
  }

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none bg-gray-200"
        onChange={handleChange}
        value={search}
        required
      />
      <Button size="icon" className="min-w-10" type="submit">
        <SearchIcon size={20} className="" />
      </Button>
    </form>
  );
}
