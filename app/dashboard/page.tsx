'use client'

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

import UserDashboard from "../components/dashboard/UserDashboard";
import AdminModeratorDashboard from "../components/dashboard/AdminModeratorDashboard";
import { DashboardData, userData } from "@/types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import ChangeUserRole from "../components/dashboard/ChangeUserRoles";
import PostModal from "../components/PostModal";
import { useTriggerStore } from "@/store/useTriggerStore";


export default function Dashboard() {
    const [userData, setUserData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token, setToken } = useAuthStore();
    const [page, setPage] = useState<string>('home');
    const { setIsModalOpen } = useTriggerStore()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance?.get<DashboardData>("/dashboard");
                setUserData(response?.data);
            } catch (err) {
                setError("Error fetching dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;


    const handleLogout = () => {
        Cookies.remove('token');
        setToken(null);
        window.location.href = '/login';
    };

    return (
        <>
            <div className="flex h-screen">
                <nav className="bg-gray-800 text-white w-[15%] p-6 hidden sm:block fixed h-screen">
                    <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                    <ul>
                        <li className="mb-3">
                            <Link href="/" className="cursor-pointer hover:bg-gray-700 p-2 rounded">Home</Link>
                        </li>
                        {userData?.userData?.role === 'admin' && (
                            <>
                                <li className="mb-3">
                                    <span
                                        onClick={() => setPage('home')}
                                        className="cursor-pointer hover:bg-gray-700 p-2 rounded">Stats</span>
                                </li>
                                <li className="mb-3">
                                    <span
                                        onClick={() => setPage('permissions')}
                                        className="cursor-pointer hover:bg-gray-700 p-2 rounded">Permission</span>
                                </li>
                            </>
                        )}

                        <li className="mb-3">
                            <span onClick={() => setIsModalOpen(true)} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Create Post</span>
                        </li>

                        <li>
                            <span onClick={handleLogout} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Logout</span>
                        </li>
                    </ul>
                </nav>

                <div className="w-[85%] ml-auto flex justify-center">
                    {userData?.userData?.role === 'user' &&
                        <UserDashboard
                            userInfo={userData?.userData}
                            post={userData?.post}
                        />
                    }

                    {(userData?.userData?.role === 'moderator' || userData?.userData?.role === 'admin') &&
                        page === 'home' &&
                        <AdminModeratorDashboard
                            data={userData}
                        />
                    }

                    {(userData?.userData?.role === 'admin' && page === 'permissions') && (
                        <ChangeUserRole />
                    )}
                </div>
            </div>
            <PostModal />
        </>
    )
}
