"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "../ui/ProductCard";
import { InboxIcon } from "@heroicons/react/24/outline";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-10 py-5 gap-5">
      {/* Hero Section */}
      <div className="px-20 bg-[#68e1cb] rounded ">
        <div className="w-2/3 mx-auto overflow-hidden ">
          <Image
            src="/Title.png"
            alt="hero-section"
            width={1200}
            height={600}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="flex flex-col rounded shadow-sm p-6 gap-5">
        <h1 className="text-xl text-gray-800 font-bold">Kategori Pilihan</h1>
        <div className="flex gap-5 justify-center">
          {categories.map((category, index) => (
            <div
              className="outline-1 outline-gray-100 w-[120px] h-[120px] shadow-md flex flex-col gap-2 items-center p-4"
              key={index}
            >
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src={category.imageUrl}
                  alt="ctg-image"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-gray-700 text-sm text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Products */}
      <div className="flex flex-wrap gap-3">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              price={product.price}
              image={product.imageUrl}
              slug={product.slug}
              stock={product.stock}
            />
          ))
        ) : (
          <div className="flex flex-col text-gray-400 w-full justify-center items-center">
            <InboxIcon className="size-20 mb-5" />
            <h4 className="font-light">Produk tidak ditemukan</h4>
          </div>
        )}
      </div>
    </div>
  );
}
