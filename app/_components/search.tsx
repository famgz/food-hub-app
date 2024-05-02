import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes"
        className="border-none bg-gray-200"
      />
      <Button size="icon" className="min-w-10">
        <SearchIcon size={20} className="" />
      </Button>
    </div>
  );
}
