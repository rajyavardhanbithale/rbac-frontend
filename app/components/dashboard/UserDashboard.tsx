import { Post, userData } from "@/types";
import Link from "next/link";
import React from "react";


export default function UserDashboard({ userInfo, post }: { userInfo: userData, post?: Post[] }) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString();
    };

    return (

        <main className="flex-1 p-6">
            <section>
                <h2 className="text-2xl font-semibold mb-6">My Posts</h2>
                {post?.length === 0 && (
                    <p className="text-gray-500">You have not created any posts yet.</p>
                )}
                <div className="flex flex-wrap gap-5">
                    {post?.map((p) => (
                        <Link
                            href={`post/${p._id}`}
                            key={p._id}
                            className="w-1/3  bg-white p-6 rounded-lg shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">Created on: {formatDate(p.createdAt)}</p>
                            <p className="text-gray-700 mb-4">{p.content.substring(0, 100)}...</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
