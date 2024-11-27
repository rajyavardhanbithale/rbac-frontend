'use client'

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

import UserDashboard from "../components/dashboard/UserDashboard";
import AdminModeratorDashboard from "../components/dashboard/AdminModeratorDashboard";
import { DashboardData, userData } from "@/types";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";


export default function Dashboard() {
    const [userData, setUserData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token, setToken } = useAuthStore();

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
                <nav className="bg-gray-800 text-white w-64 p-6 hidden sm:block">
                    <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
                    <ul>
                        <li className="mb-3">
                            <Link href="/" className="hover:bg-gray-700 p-2 rounded">Home</Link>
                        </li>
                        <li>
                            <span onClick={handleLogout} className="hover:bg-gray-700 p-2 rounded">Logout</span>
                        </li>
                    </ul>
                </nav>

                <div className="w-full">
                    {userData?.userData?.role === 'user' &&
                        <UserDashboard
                            userInfo={userData?.userData}
                            post={userData?.post}
                        />
                    }

                    {userData?.userData?.role === 'moderator' &&
                        <AdminModeratorDashboard
                            data={userData}
                        />

                    }
                </div>
            </div>
        </>
    )
}
