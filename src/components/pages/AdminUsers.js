"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import StatusBadge from "../ui/StatusBadge";
import Image from "next/image";
import Pagination from "../ui/Pagination";

export default function AdminUsers() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(searchParams.get("role") || "");

  useEffect(() => {
    fetch(`/api/user?page=${page}&role=${role}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setIsLoading(false);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
      });
  }, [page, role]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div>
          <form className="flex flex-col">
            <label className="font-medium mb-2 text-gray-800">
              Cari berdasarkan role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="outline-1 outline-gray-300 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal bg-white focus:outline-emerald-600"
            >
              <option value="">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </form>
        </div>
      </div>
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">No.HP</th>
            <th className="border border-gray-300 p-2">Kota</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Tgl Bergabung</th>
            <th className="border border-gray-300 p-2">Order</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.phoneNumber ? user.phoneNumber : "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {user.city ? user.city : "-"}
              </td>
              <td className="border border-gray-300 p-2">
                <StatusBadge status={user.role} />
              </td>
              <td className="border border-gray-300 p-2">
                {dayjs(user.created_at).format("DD-MM-YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                {user._count.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}