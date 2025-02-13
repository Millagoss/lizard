"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
function Page() {
  const { user } = useAuthContext();

  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <>
      <div className="text-center text-4xl w-full">
        <h1 className="">Only logged in users can view this page</h1>

        <a className="text-lg text-blue-400 underline" href="/">
          go to home
        </a>
      </div>
    </>
  );
}

export default Page;
