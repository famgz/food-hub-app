import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import OrderItem from "./_components/order-item";
import { convertToPlainObject } from "../_helpers/utils";
import { authOptions } from "../_lib/auth";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  let orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: { product: true },
      },
    },
  });

  orders = convertToPlainObject(orders);

  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="pb-3 text-lg font-semibold">Meus Pedidos</h2>

        <div className="space-y-3">
          {orders.map((o) => (
            <OrderItem order={o} key={o.id} />
          ))}
        </div>
      </div>
    </>
  );
}
