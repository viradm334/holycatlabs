"use client";

import { formatCurrency } from "@/lib/utils/formatCurrency";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import StatusBadge from "../ui/StatusBadge";
import Image from "next/image";
import Pagination from "../ui/Pagination";
import Modal from "../ui/Modal";
import OrderDetails from "./OrderDetails";

export default function AdminOrders() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    fetch(`/api/orders?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.ordersWithTotal);
        setIsLoading(false);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
      });
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div>
      <Modal
        title="Order Details"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <OrderDetails orderNumber={selectedOrderNumber} />
      </Modal>
      <div className="flex flex-col gap-2">
        <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">No.</th>
              <th className="border border-gray-300 p-2">No. Order</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">No.HP</th>
              <th className="border border-gray-300 p-2">Status Pesanan</th>
              <th className="border border-gray-300 p-2">
                Total Harga Pesanan
              </th>
              <th className="border border-gray-300 p-2">Tanggal Order</th>
              <th className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">
                  {order.orderNumber}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.user.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {order.phoneNumber}
                </td>
                <td className="border border-gray-300 p-2">
                  <StatusBadge status={order.status} />
                </td>
                <td className="border border-gray-300 p-2">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="border border-gray-300 p-2">
                  {dayjs(order.created_at).format("DD-MM-YYYY")}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="outline-none rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer"
                    onClick={() => {
                      setSelectedOrderNumber(order.orderNumber);
                      setIsOpen(true);
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination page={page} lastPage={meta.lastPage} />
      </div>
    </div>
  );
}
