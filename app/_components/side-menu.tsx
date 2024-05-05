"use client";

import {
  CherryIcon,
  CupSodaIcon,
  FishIcon,
  HeartIcon,
  HomeIcon,
  IceCreamConeIcon,
  MenuIcon,
  PizzaIcon,
  SandwichIcon,
  ScrollTextIcon,
  UserRound,
  UtensilsIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import LogInButton from "./buttons/login-buton";
import LogOutButton from "./buttons/logout-buton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function SideMenu() {
  const { data, status } = useSession();

  return (
    <Sheet>
      <Button variant="ghost" asChild size="icon">
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
      </Button>
      <SheetContent className="flex flex-col ">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col justify-between">
          <div className="mt-5 space-y-4">
            <div className="border-b pb-5">
              {data?.user ? (
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user.image as string} />
                    <AvatarFallback>
                      <UserRound />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data.user.name}</h3>
                    <span className="block text-xs font-light text-muted-foreground">
                      {data.user.email}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">Olá. Faça seu login</h2>
                  <LogInButton />
                </div>
              )}
            </div>

            <div className="border-b pb-5 ">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <HomeIcon size={16} />
                <span>Início</span>
              </Button>

              {data?.user && (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-full"
                  >
                    <ScrollTextIcon size={16} />
                    <span>Meus pedidos</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-full"
                  >
                    <HeartIcon size={16} />
                    <span>Restaurantes Favoritos</span>
                  </Button>
                </>
              )}
            </div>

            <div className="border-b pb-5 ">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <UtensilsIcon size={16} />
                <span>Pratos</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <SandwichIcon size={16} />
                <span>Lanches</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <PizzaIcon size={16} />
                <span>Pizzas</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <FishIcon size={16} />
                <span>Japonesa</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <IceCreamConeIcon size={16} />
                <span>Sobremesas</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <CherryIcon size={16} />
                <span>Sucos</span>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full"
              >
                <CupSodaIcon size={16} />
                <span>Refrigerantes</span>
              </Button>
            </div>
          </div>

          {data?.user && <LogOutButton text="Sair da Conta" />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
