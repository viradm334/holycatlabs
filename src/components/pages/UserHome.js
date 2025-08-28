"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

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
        {products.map((product, index) => (
          <div
          key={index}
          className="w-[200px] h-[200px] rounded-md shadow-sm flex flex-col overflow-hidden bg-white"
        >
          {/* Image Section */}
          <div className="relative w-full h-2/3">
            <Image
              src={product.imageUrl}
              alt="product-image"
              fill
              className="object-cover"
            />
          </div>
        
          {/* Info Section */}
          <div className="h-1/3 p-3 flex flex-col justify-center gap-1">
            <h4 className="text-gray-800 text-sm">{product.name}</h4>
            <p className="text-teal-600 text-sm font-semibold">{formatCurrency(product.price)}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
