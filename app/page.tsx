import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />

      <div className="section">
        <Search />
      </div>

      <div className="section">
        <CategoryList />
      </div>

      <div className="section">
        <div className="relative h-[200px] w-full">
          <Image
            src="/promo-banner-01.png"
            alt="Até 30% de descontos em pizzas"
            fill
            className="object-contain"
            quality={100}
          />
        </div>
      </div>
    </>
  );
}
