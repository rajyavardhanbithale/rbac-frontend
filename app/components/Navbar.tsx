'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import PostModal from "./PostModal";  // Import the PostModal component

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { token, setToken } = useAuthStore();
    
    const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    const handleLogout = () => {
        Cookies.remove('token');
        setToken(null);
        setIsLoggedIn(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="block w-11/12 px-4 py-2 mx-auto text-white bg-slate-900 bg-opacity-90 backdrop-blur-xl shadow-md rounded-2xl lg:px-8 lg:py-3 mt-5">
            <div className="flex flex-wrap items-center justify-between mx-auto text-gray-100">
                <Link
                    href="/"
                    className="mr-4 text-xl block cursor-pointer py-1.5 text-gray-200 font-semibold"
                >
                    RBAC POSTS
                </Link>

                <div>
                    {isLoggedIn ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleOpenModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Add Post
                            </button>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Render the PostModal and pass necessary props */}
            <PostModal
                isOpen={isModalOpen}
                handleClose={handleCloseModal}
            />
        </nav>
    );
}
