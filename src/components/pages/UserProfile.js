"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "../ui/BackButton";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import EditProfileForm from "../forms/EditProfileForm";

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
    postal_code: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/user/data/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address,
          city: data.user.city,
          province: data.user.province,
          postal_code: data.user.postal_code
        });
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
        <Modal isOpen={isOpen} title="Edit Profile" onClose={() => setIsOpen(false)} >
            <EditProfileForm userId={user.id} onSuccess={() => setIsOpen(false)}/>
        </Modal>
      <BackButton destination={'/'}/>
      <div className="flex flex-col shadow-md rounded outline-1 outline-gray-300 w-1/2 min-h p-5 mb-3">
        <div className="w-full">
          <h1 className="text-gray-700 text-md font-semibold text-center">
            Informasi Pribadi
          </h1>
        </div>
        {/* Data */}
        <div className="w-full flex py-3 px-3 mb-3">
          <div className="flex flex-col justify-center w-1/2 gap-2">
            <div>
              <h1 className="font-bold text-sm text-gray-600">Nama</h1>
              <p className="font-medium text-gray-800">{profile.name}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-600">Email</h1>
              <p className="font-medium text-gray-800">{profile.email}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-600">No. HP</h1>
              <p className="font-medium text-gray-800">{profile.phoneNumber}</p>
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-2">
            <div>
              <h1 className="font-bold text-sm text-gray-600">Alamat</h1>
              <p className="font-medium text-gray-800">{profile.address}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-600">Kota</h1>
              <p className="font-medium text-gray-800">{profile.city}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-600">Provinsi</h1>
              <p className="font-medium text-gray-800">{profile.province}</p>
            </div>
            <div>
              <h1 className="font-bold text-sm text-gray-600">Kode Pos</h1>
              <p className="font-medium text-gray-800">{profile.postal_code}</p>
            </div>
          </div>
        </div>
        {/* End of Data */}
        <Button variant={'primary'} text={'Edit Profile'} onClick={() => setIsOpen(true)}/>
      </div>
    </div>
  );
}