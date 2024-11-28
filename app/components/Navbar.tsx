'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const { token, setToken } = useAuthStore();
    const pathname = usePathname()


    useEffect(() => {
        if (token !== null && token !== undefined) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    useEffect(() => {
        if (pathname === "/login" || pathname === "/register" || pathname === "/dashboard") {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    }, [pathname]);


    return (
        <div className={`${isHidden ? "lg:hidden flex" : "flex"}  justify-center`}>
            <nav className="block absolute lg:w-1/2 px-4 py-2 mx-auto text-white bg-slate-900 bg-opacity-90 backdrop-blur-xl shadow-md rounded-2xl lg:px-8 lg:py-3 mt-5">
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
                                <Link href="/dashboard">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        Dashboard
                                    </button>
                                </Link>
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
            </nav>
        </div>
    );
}
