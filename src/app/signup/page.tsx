"use client";
import React, { useState } from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await signUp(email, password);

    if (result.error) {
      setErrorMsg((result.error as { message: string }).message);
      return;
    }

    // Success: Redirect to admin page
    setLoading(false);
    setErrorMsg("");
    router.push("/signin");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6   shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Sign Up</h1>

        {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

        <form onSubmit={handleForm} className="flex text-black flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded focus:outline-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded focus:outline-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="w-full flex justify-end">
          <a href="/signup" className="underline mt-1">
            sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Page;
