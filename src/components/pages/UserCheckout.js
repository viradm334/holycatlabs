"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BackButton from "../ui/BackButton";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function UserCheckout({ user }) {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    province: "",
    phoneNumber: "",
    postal_code: "",
  });

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    if (cart?.id) {
      fetch(`/api/cart/get-items/${cart.id}`)
        .then((res) => res.json())
        .then((item) => setCartItems(item.data));
    }
  }, [cart]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/user/data/${user.id}`)
        .then((res) => res.json())
        .then((item) => {
          setFormData({
            name: item.user.name,
            address: item.user.address,
            phoneNumber: item.user.phoneNumber,
            city: item.user.city,
            province: item.user.province,
            postal_code: item.user.postal_code,
          });
          setIsLoading(false);
        });
    }
  }, [cart]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userId = user.id;
    formData.cartId = cart.id;
    formData.products = cartItems;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        router.push("/customer/orders");
      }
    } catch (err) {
      alert(err.message);
      console.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <>
      <div className="main flex flex-col gap-3">
        <h1 className="text-xl text-teal-600 font-semibold px-5">Checkout</h1>
        <BackButton destination={"/cart"} />
        <div className="flex p-5 w-full gap-4">
          <form
            className="flex flex-col p-5 w-1/2 shadow-md"
            onSubmit={handleSubmit}
          >
            <h1 className="font-bold mb-3 px-3 text-gray-800 text-md text-center">
              Data Penerima
            </h1>
            <label className="text-sm text-teal-700 font-bold mb-1.5">
              Name
            </label>
            <Input
              type={"text"}
              name={"name"}
              placeholder="Enter your name here"
              value={formData?.name || ""}
              onChange={handleChange}
            />

            <label className="text-sm text-teal-700 font-bold mb-1.5">
              Phone Number
            </label>
            <Input
              type={"text"}
              name={"phoneNumber"}
              placeholder="Enter your phone number here"
              value={formData?.phoneNumber || ""}
              onChange={handleChange}
            />

            <label className="text-sm text-teal-700 font-bold mb-1.5">
              Address
            </label>
            <Input
              type={"text"}
              name={"address"}
              placeholder="Enter your address here"
              value={formData?.address || ""}
              onChange={handleChange}
            />
            <label className="text-sm text-teal-700 font-bold mb-1.5">
              City
            </label>
            <Input
              type={"text"}
              name={"city"}
              placeholder="Enter your city here"
              value={formData?.city || ""}
              onChange={handleChange}
            />
            <label className="text-sm text-teal-700 font-bold mb-1.5">
              Province
            </label>
            <Input
              type={"text"}
              name={"province"}
              placeholder="Enter your province here"
              value={formData?.province || ""}
              onChange={handleChange}
            />

            <label className="text-sm text-teal-700 font-bold mb-1.5">
              Postal Code
            </label>
            <Input
              type={"text"}
              name={"postal_code"}
              value={formData?.postal_code || ""}
              placeholder={"Enter your postal code here"}
              onChange={handleChange}
            />
            <Button variant={"primary"} type="submit" text={"Buat Pesanan"} />
          </form>
          <div className="flex flex-col w-1/2 p-3 gap-3 h-[300px] overflow-y-auto">
            <h1 className="font-bold mb-3 px-3 text-gray-800 text-md text-center">
              Barang yang Dipesan
            </h1>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="outline-1 outline-gray-300 rounded p-3 w-full flex gap-4"
              >
                {/* Image Section */}
                <Link href={`/${item.product.slug}`}>
                  <div className="relative w-[200px] h-[150px]">
                    <Image
                      src={item.product.imageUrl}
                      fill
                      alt="item-image"
                      className="object-cover"
                    />
                  </div>
                </Link>

                {/* Info + Qty Section */}
                <div className="flex flex-col justify-between w-full gap-1">
                  {/* Title & Price */}
                  <h4 className="font-bold text-md text-slate-700">
                    {item.product.name}
                  </h4>
                  <h5 className="text-gray-800 text-sm font-medium">
                    Jumlah: {item.quantity}
                  </h5>
                  <h5 className="text-gray-800 font-medium">
                    Harga satuan: {formatCurrency(item.product.price)}
                  </h5>
                  <h5 className="text-gray-800 font-semibold">
                    Subtotal:
                    {formatCurrency(item.product.price * item.quantity)}
                  </h5>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <h1 className="font-bold text-md text-teal-700">
                Total:
                {formatCurrency(
                  cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
