"use client";

import { useState, useEffect } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import BackButton from "../ui/BackButton";
import Input from "../ui/Input";

export default function CreateProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    public_id: "",
  });
  const [image, setImage] = useState({ secure_url: "", public_id: "" });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {setCategories(data.categories); setIsLoading(false)});
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (public_id) => {
    const confirmed = confirm("Anda yakin untuk menghapus foto produk?");

    if (confirmed) {
      try {
        console.log(public_id);
        const res = await fetch("/api/delete-image", {
          method: "POST",
          body: JSON.stringify({ public_id }),
        });

        if (res.ok) {
          const data = await res.json();
          setImage({ secure_url: "", public_id: "" });
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image.secure_url || !image.public_id) {
      alert("Mohon untuk upload foto produk");
      return;
    }

    formData.imageUrl = image.secure_url;
    formData.public_id = image.public_id;

    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.push("/admin/products");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
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
      <BackButton destination={"/admin/products"} />
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 px-5 gap-2">
        {/* Product Name */}
        <label className="text-sm text-teal-700 font-bold mb-1">
          Product Name
        </label>
        <Input
          name={"name"}
          type={"text"}
          value={formData.name}
          onChange={handleInputChange}
          placeholder={"Enter product name"}
        />

        {/* Category */}
        <label className="text-sm text-teal-700 font-bold mb-1">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="outline-1 outline-gray-400 rounded-sm mb-1 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-teal-500 bg-white"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Description */}
        <label className="text-sm text-teal-700 font-bold mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="outline-1 outline-gray-400 rounded-sm mb-1 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-teal-500 bg-white"
        />

        {/* Price */}
        <label className="text-sm text-teal-700 font-bold mb-1">Price</label>
        <Input
          name={"price"}
          type={"number"}
          value={formData.price}
          onChange={handleInputChange}
          placeholder={"Enter product price"}
        />

        {/* Stock */}
        <label className="text-sm text-teal-700 font-bold mb-1">Stock</label>
        <Input
          name={"stock"}
          type={"number"}
          value={formData.stock}
          onChange={handleInputChange}
          placeholder={"Enter product stock"}
        />

        <h4 className="text-sm text-teal-700 font-bold mb-1">Product Image</h4>
        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary"
          onSuccess={(results) => {
            setImage({
              secure_url: results.info.secure_url,
              public_id: results.info.public_id,
            });
          }}
          
          options={{ clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], maxFileSize: 5242880 }}
        >
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => open()}
                className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer transition flex flex-col items-center justify-center gap-1 mb-3"
              >
                <CloudArrowUpIcon className="size-6" />
                <span className="text-sm">Upload an Image</span>
              </button>
            );
          }}
        </CldUploadWidget>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {image.secure_url && (
              <div className="relative w-32 h-32 rounded overflow-hidden border border-gray-300">
                {/* Delete Button */}
                <button
                  type="button"
                  className="absolute top-1 right-1 z-10 bg-white rounded-full p-0.5 hover:bg-red-100"
                  onClick={() => handleDelete(image.public_id)}
                >
                  <XCircleIcon className="size-5 text-red-500" />
                </button>

                {/* Image */}
                <Image
                  src={image.secure_url}
                  width={50}
                  height={50}
                  alt="product-image"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-3 bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
