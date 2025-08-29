"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Pagination from "../ui/Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Button from "../ui/Button";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [inputName, setInputName] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(searchParams.get("name") || "");

  useEffect(() => {
    const currentName = searchParams.get("name") || "";
    setName(currentName);
  }, [searchParams]);

  useEffect(() => {
    fetch(
      `/api/products/admin?page=${page}&name=${name}&category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.productsWithSales);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
        setIsLoading(false);
      });
  }, [page, name, category]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (inputName) {
      setName(inputName);
      params.set("name", inputName);
      params.set("page", "1");
    } else {
      params.delete("name");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname);
    setStatus("");
    setInputName("");
    setCategory("");
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Anda yakin untuk menghapus produk?");

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/delete/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        const data = await res.json();
        setProducts((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
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
    <div className="flex flex-col gap-3">
      <Link href={"/admin/products/create"}>
        <button className="outline-none rounded px-3 py-2 transition bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700">
          + Create New Product
        </button>
      </Link>
      <div className="w-full rounded-md mb-2">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col w-full sm:w-1/2 md:w-1/3 gap-1"
          >
            <label className="text-sm">Search Product</label>
            <div className="relative w-full">
              <input
                type="text"
                className="w-full pr-10 p-2 rounded-sm bg-white outline-1 outline-gray-300 placeholder:text-sm focus:outline-emerald-600"
                placeholder="Search..."
                value={inputName}
                name="inputName"
                onChange={(e) => setInputName(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 size-5 text-gray-500" />
            </div>
          </form>

          {/* Clear Button */}
          <div className="flex flex-col justify-end">
            <button
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-white transition rounded px-4 py-2"
            >
              Clear Search
            </button>
          </div>

          {/* Category Select */}
          <form className="flex flex-col w-full sm:w-1/2 md:w-1/4 gap-1">
            <label className="text-sm">Category</label>
            <select
              className="outline-1 outline-gray-300 bg-white rounded-sm p-2 focus:outline-emerald-600"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>

      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Products Sold</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-center">
                <div className="relative w-[150px] h-[100px] mx-auto">
                  <Image
                    src={product.imageUrl}
                    fill
                    alt="item-image"
                    className="rounded-md object-cover"
                  />
                </div>
              </td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">
                {product.category.name}
              </td>
              <td className="border border-gray-300 p-2">{product.stock}</td>
              <td className="border border-gray-300 p-2">
                {product.totalSold}
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex gap-2 justify-center">
                  <Link
                    href={`/admin/products/edit/${product.slug}`}
                    className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    className="outline-none bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
