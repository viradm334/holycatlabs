"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import Image from "next/image";

export default function ProductCard({ slug, name, image, price, stock }) {
  return (
    <Link href={`/${slug}`}>
      <div className="w-[200px] h-[270px] rounded-md shadow-sm flex flex-col overflow-hidden bg-white">
        {/* Image Section */}
        <div className="relative w-full h-2/3">
          <Image
            src={image}
            alt="product-image"
            fill
            className="object-contain"
          />
        </div>

        {/* Info Section */}
        <div className="h-1/3 p-3 flex flex-col justify-center gap-1">
          <h4 className="text-gray-800 text-sm truncate">{name}</h4>
          {stock <= 5 && (
            <p className="font-medium text-xs text-red-500">
              Hanya {stock} lagi!
            </p>
          )}
          <p className="text-teal-600 text-sm font-semibold">
            {formatCurrency(price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
