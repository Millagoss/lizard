"use client";

import { useState } from "react";
import AddUsers from "@/components/AddUser";
import GetUsers from "@/components/GetUsers";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const [body, setBody] = useState("add-user");
  const { user, logout } = useAuthContext();

  return (
    <div className="w-full">
      <div className="h-16 p-4 flex justify-between items-center border-b border-gray-200 w-full">
        <h1 className="text-xl font-bold">Firebase Demo</h1>
        <div className="flex items-center gap-2">
          <h2>{user?.email}</h2>
          {user ? (
            <button onClick={logout} className="px-5 py-2 border rounded-md">
              Log out
            </button>
          ) : (
            <Link href={"/signin"}>
              <button className="px-5 py-2 border rounded-md">Login</button>
            </Link>
          )}
          <Link href={"/admin"}>
            {user && (
              <button className="px-5 ml-2 py-2 border rounded-md">
                Admin
              </button>
            )}
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="w-44 py-4 min-h-screen h-full border-r border-gray-300">
          <h1
            className={`hover:bg-gray-600 p-3 cursor-pointer transition-all ${
              body === "add-user" ? "bg-gray-600" : ""
            }`}
            onClick={() => setBody("add-user")}
          >
            Add User{" "}
          </h1>
          <h1
            className={`hover:bg-gray-600 p-3 cursor-pointer transition-all ${
              body === "get-user" ? "bg-gray-600" : ""
            }`}
            onClick={() => setBody("get-user")}
          >
            Get Users
          </h1>
        </div>

        {body === "add-user" && <AddUsers />}
        {body === "get-user" && <GetUsers />}
      </div>
    </div>
  );
}
