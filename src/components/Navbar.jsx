"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { getPreEmitDiagnostics } from "typescript";
const MyComponent = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { data: session } = useSession();
  const handleDeleteAccount = async () => {};
  const greeting = () => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 4) {
      return "Good Night🌙";
    } else if (hours < 12) {
      return "Good Morning😎";
    } else if (hours < 18) {
      return "Good Afternoon🌞";
    } else {
      return "Good Evening🌆";
    }
  };
  const handleLogout = async () => {
    await signOut();
    setPopupOpen(false);
  };
  console.log(session);
  return (
    <>
      <div className="bg-black text-white fixed top-0 w-full">
        <div className="flex justify-between">
          <div className="lp mt-4 ml-3 text-2xl">{greeting()}</div>
          <div className="lp">
            {session ? (
              <div className="relative ">
                <Image
                  alt="Profile Picture"
                  src={session.user.image}
                  width={50}
                  height={50}
                  className="my-image m-2 rounded-full"
                  onClick={() => setPopupOpen(true)}
                />
              </div>
            ) : null}
          </div>
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-black text-white p-4 rounded-lg text-center">
              {session && (
                <div className="mb-4">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={50}
                    height={50}
                    className="mx-auto rounded-full mb-2"
                  />
                  <p>Welcome, {session.user.name}!</p>
                </div>
              )}

              <p className="mb-4">
                Are you sure you want to logout or delete your account?
              </p>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-2 w-full"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-md mb-2 w-full"
              >
                Delete Account
              </button>
              <button
                onClick={() => setPopupOpen(false)}
                className="text-white mt-2 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyComponent;
