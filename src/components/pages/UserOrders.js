"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import StatusBadge from "../ui/StatusBadge";
import dayjs from "dayjs";
import BackButton from "../ui/BackButton";
import { useSearchParams } from "next/navigation";
import Pagination from "../ui/Pagination";

export default function UserOrders({ user }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/orders/my/${user.id}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
        setIsLoading(false);
      });
  }, [user, page]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-xl text-teal-600 font-semibold px-5 text-start">
        My Orders
      </h1>
      <BackButton destination={"/"} />
      {orders.map((order) => {
        const item = order.orderItems[0];

        return (
          <div
            key={order.id}
            className="w-2/3 border border-gray-300 rounded-lg p-4 bg-white flex flex-col shadow-md"
          >
            {/* Card header */}
            <div className="flex justify-start gap-4 mb-2">
              <ShoppingBagIcon
                className="size-5 text-emerald-700
            "
              />
              <h3 className="text-sm font-light text-gray-800">
                {order.orderNumber}
              </h3>
              <h3 className="text-sm font-light text-gray-800">
                {dayjs(order.created_at).format("DD MMM YYYY")}
              </h3>
              <StatusBadge status={order.status} />
            </div>
            {/* End of Card header */}

            <div className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-gray-50">
              {/* Image Section */}
              <Link href={`/${item.slug ?? ""}`} className="shrink-0">
                <div className="relative w-[150px] h-[100px]">
                  <Image
                    src={item.product.imageUrl}
                    fill
                    alt="item-image"
                    className="rounded-md object-cover"
                  />
                </div>
              </Link>

              {/* Info + Qty Section */}
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h4 className="text-base font-semibold text-gray-700">
                    {item.product.name}
                  </h4>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-800">
                    Price: {formatCurrency(item.price)}
                  </p>
                  <p className="text-sm text-gray-800">
                    Quantity: {item.quantity}x
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Subtotal: {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>

            {/* Optional: Show how many more items */}
            {order.orderItems.length > 1 && (
              <p className="text-sm text-gray-500 mt-2">
                +{order.orderItems.length - 1} more item
                {order.orderItems.length > 2 ? "s" : ""}
              </p>
            )}

            <div className="flex justify-end gap-4">
              <Link
                href={`/user/orders/${order.orderNumber}`}
                className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded transition"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        );
      })}
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
