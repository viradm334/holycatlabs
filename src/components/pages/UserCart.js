"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import BackButton from "../ui/BackButton";
import _ from "lodash";

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cartItemsRef = useRef(cartItems);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    if (cart?.id) {
      fetch(`/api/cart/get-items/${cart.id}`)
        .then((res) => res.json())
        .then((item) => {
          setCartItems(item.data);
          setIsLoading(false);
        });
    }
  }, [cart]);

  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  useEffect(() => {
    return () => {
      debouncedUpdateQty.cancel();
    };
  }, []);

  const updateQuantity = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Apa anda yakin untuk menghapus barang dari keranjang?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/cart/delete-item/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          window.location.reload();
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      return;
    }
  };

  const debouncedUpdateQty = useMemo(() => {
    return _.debounce(async (itemId) => {
      const item = cartItemsRef.current.find((i) => i.id === itemId);
      if (item) {
        try {
          const res = await fetch(`/api/cart/update-quantity/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify({ quantity: item.quantity }),
          });

          if (res.ok && res.status !== 204) {
            const data = await res.json();
            updateQuantity(item.id, data.cartItem.quantity);
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }, 2000);
  }, []);

  const handleUpdateQuantity = (itemId, quantity) => {
    updateQuantity(itemId, quantity);
    debouncedUpdateQty(itemId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-3 gap-5 mt-3">
        <h1 className="text-xl text-teal-600 font-semibold px-5">Cart</h1>
      <BackButton destination={"/"} />
      <div className="flex gap-10 px-3">
        <div className="flex flex-col w-2/3">
          {cartItems?.length !== 0 ? (
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="outline-1 outline-gray-300 rounded p-4 mb-3 w-full flex gap-4 shadow-sm"
                >
                  {/* Image Section */}
                  <Link href={`/${item.product.slug}`}>
                    <div className="relative w-[150px] h-[100px]">
                      <Image
                        src={
                          item.product.imageUrl
                        }
                        fill
                        alt="item-image"
                        className="rounded-md object-cover"
                      />
                    </div>
                  </Link>

                  {/* Info + Qty Section */}
                  <div className="flex w-full justify-between items-center">
                    {/* Title & Price */}
                    <div className="flex flex-col">
                      <h4 className="font-medium text-sm text-slate-700">
                        {item.product.name}
                      </h4>
                      <h5 className="text-gray-800 font-semibold mb-2">
                        {formatCurrency(item.product.price)}
                      </h5>
                    </div>

                    {/* Qty Box directly below price */}
                    <div className="flex items-center">
                      <div className="qty-box flex w-full h-9 items-center justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (item.quantity === 1) {
                              debouncedUpdateQty.cancel();
                              handleDelete(item.id);
                            } else {
                              handleUpdateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="outline-1 outline-gray-400 w-8 h-8 flex justify-center items-center font-bold"
                        >
                          −
                        </button>
                        <div className="outline-1 outline-gray-400 px-4 py-1">
                          {item.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleUpdateQuantity(item.id, item.quantity + 1);
                          }}
                          className="outline-1 outline-gray-400 w-8 h-8 flex justify-center items-center font-bold"
                        >
                          +
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          <TrashIcon className="size-5 text-red-600 ml-4 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 outline-1 outline-gray-300">
              <p className="mb-3 text-center text-lg font-medium text-gray-700">
                Keranjang belanjamu kosong!
              </p>
              <Link
                href="/"
                className="text-white bg-emerald-600 hover:bg-emerald-700 rounded px-4 py-2 w-40 text-center transition"
              >
                Mulai belanja
              </Link>
            </div>
          )}
        </div>
        <div className="outline-1 outline-gray-300 bg-white rounded p-5 flex flex-col w-1/3 h-1/2 shadow-md">
          <h1 className="font-bold text-xl text-gray-700 mb-3">
            Ringkasan Belanja
          </h1>
          <h1 className="font-medium text-md text-gray-700">
            Total belanja:{" "}
            {formatCurrency(
              cartItems.reduce(
                (acc, item) =>
                  acc + item.quantity * item.product.price,
                0
              )
            )}
          </h1>
          <div className="flex justify-center">
            {cartItems.length > 0 ? (
              <Link
                href={"/checkout"}
                className="text-white text-center transition bg-teal-500 rounded hover:bg-teal-600 px-3 py-2 mt-4 cursor-pointer w-full"
              >
                Check Out
              </Link>
            ) : (
              <button
                className="text-white text-center bg-gray-300 rounded px-3 py-2 mt-4 w-full"
                disabled
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}