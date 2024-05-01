import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />

      <div className="section">
        <Search />
      </div>

      <div className="section !pr-0">
        <CategoryList />
      </div>

      <div className="section">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de descontos em pizzas"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="section !pr-0">
        <ProductsList />
      </div>
    </>
  );
}
