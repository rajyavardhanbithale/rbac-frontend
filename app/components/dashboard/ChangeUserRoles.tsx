import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Interface for User Data
interface User {
    _id: {
        _id: string;
        name: string;
        email: string;
    };
    role: "admin" | "user" | "moderator";
    permissions: string[]; // Added permissions field
}

export default function ChangeUserRole() {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newRole, setNewRole] = useState<"admin" | "user" | "moderator">("user");


    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/users");
            setAllUsers(response.data);
        } catch (error) {
            // console.error("Error fetching all users.");
            toast.error("Error fetching all users.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const handleRoleChange = async () => {
        if (!selectedUser) return;

        try {
            const res = await axiosInstance.patch(`/admin/users/${selectedUser._id._id}`, {
                role: newRole,
            });
            if (res.status === 200) {
                setAllUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id._id === selectedUser._id._id ? { ...user, role: newRole } : user
                    )
                );
                toast.success("User role updated successfully!");
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Error updating user role.");
        }
    };


    const handleDeleteUser = async (userId: string) => {
        try {
            const resp = await axiosInstance.delete(`/admin/users/${userId}`);
            if (resp.status === 200) {
                setAllUsers((prevUsers) => prevUsers.filter((user) => user._id._id !== userId));
                toast.success("User deleted successfully!");
            }
        } catch (error) {
            toast.error("Error deleting user.");

        }
    };

    if(!allUsers) return <div>Loading</div>

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Manage User Roles</h2>

            {loading ? (
                <div className="flex justify-center">
                    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Permissions</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.map((user,index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2 text-sm text-gray-800">{user?._id?.name}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{user?._id?.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{user?.role}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        {user?.permissions?.length > 0 ? (
                                            <ul className="list-disc pl-5 space-y-1">
                                                {user?.permissions?.map((permission) => (
                                                    <li key={permission} className="text-sm text-gray-700">{permission?.replaceAll('_', ' ')}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-sm text-gray-500">No permissions</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600 focus:outline-none"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setNewRole(user?.role);
                                                setIsModalOpen(true);
                                            }}
                                        >
                                            Edit Role
                                        </button>
                                        <button
                                            className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md text-xs hover:bg-red-600 focus:outline-none"
                                            onClick={() => handleDeleteUser(user?._id?._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-xl font-semibold mb-4">Edit Role for {selectedUser?._id?.name}</h3>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                                Choose Role:
                            </label>
                            <select
                                id="role"
                                value={newRole}
                                onChange={(e) => setNewRole(e?.target?.value as "admin" | "user" | "moderator")}
                                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-md text-xs hover:bg-gray-500"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600"
                                onClick={handleRoleChange}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
