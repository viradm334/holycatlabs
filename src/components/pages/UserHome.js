"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductCard from "../ui/ProductCard";
import { InboxIcon } from "@heroicons/react/24/outline";
import Pagination from "../ui/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function UserHome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const page = parseInt(searchParams.get("page") || "1");
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    fetch(`/api/products?page=${page}&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err.message);
        setIsLoading(false);
      });
  }, [page, selectedCategory]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleChange = (slug) => {
    const selectedCategory = slug;
    setSelectedCategory(selectedCategory);

    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
      params.set("page", "1");
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilter = () => {
    setSelectedCategory("");
    router.push(pathname);
  };

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
        <h1 className="text-xl text-gray-800 font-bold">Kategori Produk</h1>
        <div className="flex gap-5 justify-center">
          {categories.map((category, index) => {
            const isSelected = category.slug === selectedCategory;
            return(
            <div
              className={`outline-1 ${isSelected? "outline-teal-500": "outline-gray-100"} w-[120px] h-[120px] shadow-md flex flex-col gap-2 items-center p-4 cursor-pointer`}
              key={index}
              onClick={() => handleChange(category.slug)}
            >
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src={category.imageUrl}
                  alt="category-image"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-semibold text-gray-700 text-sm text-center">
                {category.name}
              </p>
            </div>
          )})}
        </div>
          {selectedCategory && (
          <button
            onClick={clearFilter}
            className="w-fit self-center mt-3 px-3 py-2 text-sm bg-teal-500 text-white rounded hover:bg-teal-600 transition"
          >
            Clear Filter
          </button>
        )}
      </div>
      {/* Products */}
      <div className="flex flex-col gap-3">
      <h1 className="text-xl text-gray-800 font-bold px-5">Untuk Anda</h1>
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
      <Pagination page={page} lastPage={meta.lastPage}/>
    </div>
  );
}
