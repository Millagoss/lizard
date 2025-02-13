"use client";

import { useState, useEffect } from "react";
import getDoument from "@/firebase/firestore/getData";
import getAllDocuments from "@/firebase/firestore/getData";

type User = {
  id: string;
  name: string;
  email: string;
}[];

export default function GetUsers() {
  const [users, setUsers] = useState<User>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch users from Firestore
  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const { results, error } = await getAllDocuments("users");
      console.log(results, "rsssssss");
      if (results) {
        setUsers(results);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="p-4">
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Users</h1>
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {users.map(
                (user: { id: string; name: string; email: string }) => (
                  <li
                    key={user.id}
                    className="p-2 border-b  shadow-sm flex justify-between"
                  >
                    <span>
                      {user.name} - {user.email}
                    </span>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
