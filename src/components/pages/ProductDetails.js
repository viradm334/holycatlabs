"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import BackButton from "../ui/BackButton";
import Button from "../ui/Button";

export default function ProductDetails({ user }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { slug } = params;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          router.push("/");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProduct(data.product);
          setIsLoading(false);
        }
      });
  }, [slug]);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  const insertCartItem = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/cart/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cart.id,
          productId: product.id,
          quantity: quantity,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setQuantity(1);
      }
    } catch (err) {
      alert(err);
      console.error(err);
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
    <div className="flex flex-col gap-2 mt-3">
      <BackButton destination={"/"} />
      <div className="main w-full flex justify-center items-center">
        <div className="max-w-6xl w-full p-5 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="img w-full md:w-1/2 flex-col flex justify-center items-center">
            <Image
              src={product.imageUrl}
              height={400}
              width={300}
              alt="product-image"
              className="rounded-lg object-cover mb-2"
            />
          </div>

          {/* Product Details */}
          <div className="product-details w-full md:w-1/2 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>
            <h1 className="text-md font-semibold text-teal-600">
              {formatCurrency(product?.price)}
            </h1>

            {/* Quantity Selector */}
            <h1 className="text-gray-700">Jumlah</h1>
            <div className="qty-box flex items-center w-40 mb-3">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="w-8 h-8 border border-gray-300 flex justify-center items-center font-bold"
              >
                -
              </button>
              <div className="w-12 h-8 border border-gray-300 flex justify-center items-center">
                {quantity}
              </div>
              <button
                type="button"
                onClick={addQuantity}
                className="w-8 h-8 border border-gray-300 flex justify-center items-center font-bold"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Add to Cart Button */}
              <Button variant={'primary'} onClick={insertCartItem} text={'Tambahkan ke keranjang'}/>
            </div>

            {/* Category */}

            <div>
              <h2 className="font-bold text-md mb-1">Kategori</h2>
              <p className="text-gray-700 text-sm">{product?.category.name}</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-bold text-md mb-1">Deskripsi</h2>
              <p className="text-gray-700 text-sm">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
