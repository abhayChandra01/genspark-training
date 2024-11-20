import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/JsonServerAPI";

interface User {
  id: number;
  name: string;
}

const JsonServerPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded shadow-md h-full">
      <h1 className="text-xl font-bold">Users List from JSON Server</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
                ID
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-700 uppercase">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition duration-200`}
              >
                <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JsonServerPage;
