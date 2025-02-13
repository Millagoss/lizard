import { useState } from "react";
import addData from "@/firebase/firestore/addData";

export default function AddUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = { name, email };
    const { error } = await addData("users", crypto.randomUUID(), data);

    if (error) {
      setMessage("Error adding data.");
      console.error(error);
    } else {
      setMessage("User added successfully!");
      setName("");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl  font-bold mb-4">Add User to Firestore</h1>
      <form
        onSubmit={handleForm}
        className="flex text-black flex-col gap-4 w-80"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Adding..." : "Add Data"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
