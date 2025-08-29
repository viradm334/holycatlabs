"use client";

import { useEffect, useState } from "react";
import StatusBadge from "../ui/StatusBadge";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import {
  ClipboardDocumentCheckIcon,
  UserIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

export default function OrderDetails({ orderNumber }) {
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.orderWithTotal));
  }, []);

  return (
    <div className="flex flex-col w-full h-[300px] overflow-y-auto text-sm text-gray-600 font-light gap-3 bg-gray-100">
      {/* Informasi Pesanan */}
      <div className="flex flex-col gap-2 rounded bg-white p-3">
        <div className="flex gap-2">
          <ClipboardDocumentCheckIcon className="size-5 text-orange-400" />
          <h1 className="text-sm font-bold text-gray-800">Informasi Pesanan</h1>
        </div>
        <div className="flex">
          <StatusBadge status={order.status} />
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <p>
            No. pesanan:{" "}
            <span className="font-semibold text-md text-teal-600">
              {orderNumber}
            </span>
          </p>
          <p>
            Tanggal pembelian:
            {dayjs(order.created_at).format("DD-MM-YYYY HH:mm")}
          </p>
        </div>
      </div>
      {/* Informasi Pengiriman */}
      <div className="flex flex-col gap-2 bg-white p-3">
        <div className="flex gap-2">
          <UserIcon className="size-5 text-green-700" />
          <h1 className="text-sm font-bold text-gray-800">
            Informasi Penerima
          </h1>
        </div>
        <div className="flex flex-col gap-1 text-xs">
          <p>Nama penerima: {order.name}</p>
          <p>
            Alamat penerima:{" "}
            {`${order.address}, ${order.city}, ${order.province} ${order.postal_code}`}
          </p>
          <p>Kontak penerima: {order.phoneNumber}</p>
        </div>
      </div>
      {/* Detail barang */}
      <div className="flex flex-col bg-white p-3">
        <div className="flex gap-2">
          <CubeIcon className="size-5 text-teal-600" />
          <h1 className="text-sm font-bold text-gray-800">Detail Produk</h1>
        </div>
        {order.orderItems?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded p-4 w-full flex flex-col sm:flex-row gap-4 mb-3"
          >
            {/* Image Section */}
            <Link href={`/${item.product.slug}`}>
              <div className="relative w-full sm:w-[150px] h-[150px] sm:h-[100px]">
                <Image
                  src={item.product.imageUrl}
                  fill
                  alt="item-image"
                  className="rounded-md object-contain"
                />
              </div>
            </Link>

            {/* Info + Qty Section */}
            <div className="flex flex-col w-full text-xs justify-between">
              <h4 className="font-bold  text-slate-700 text-md">
                {item.product.name}
              </h4>
              <h5 className="text-gray-800 font-medium">
                Jumlah: {item.quantity}
              </h5>
              <h5 className="text-gray-800 font-medium">
                Harga satuan: {formatCurrency(item.price)}
              </h5>
              <h5 className="text-gray-800 font-semibold">
                Subtotal: {formatCurrency(item.price * item.quantity)}
              </h5>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <h1 className="font-bold mb-3 text-teal-600 text-md">
            Total Price: {formatCurrency(order.totalPrice)}
          </h1>
        </div>
      </div>
    </div>
  );
}
