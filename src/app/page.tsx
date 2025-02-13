"use client";

import { useState } from "react";
import AddUsers from "@/components/AddUser";
import GetUsers from "@/components/GetUsers";

export default function Home() {
  const [body, setBody] = useState("");

  return (
    <div>
      <div className="h-16 p-4 flex items-center border-b border-gray-200 w-full">
        <h1 className="text-xl font-bold">Firebase Demo</h1>
      </div>
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
  );
}
