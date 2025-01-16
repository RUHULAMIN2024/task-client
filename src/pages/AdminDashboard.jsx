/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(users);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://task-server-world.vercel.app/api/users"
        );
        setUsers(response.data.data);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">User Data</h2>
        {users.length === 0 ? (
          <div className="text-center text-gray-600 py-6">No users found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="md:min-w-full min-w-0 table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="px-6 w-1/3 py-3">Name</th>
                  <th className="px-6 w-1/3 py-3">Social Media Handle</th>
                  <th className="px-6 w-1/3 py-3">Images</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-100 transition duration-150"
                  >
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.socialHandle}</td>
                    <td className="px-6 flex py-3">
                      {user.images?.length > 0 ? (
                        user.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`user-image-${index}`}
                            className="w-16 h-16 object-cover rounded-md mr-2"
                          />
                        ))
                      ) : (
                        <span>No Images</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
