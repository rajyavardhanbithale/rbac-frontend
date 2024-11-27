import { DashboardData } from "@/types";
import React from "react";

export default function AdminModeratorDashboard({
    data,
}: {
    data: DashboardData;
}) {
    const { userData, postCount, commentsCount, filteredStatsUser } = data;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 space-y-8 max-w-4xl w-full">
                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Info</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between text-gray-600">
                            <span className="font-medium">Name:</span>
                            <span className="text-gray-800">{userData.userInfo.name}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span className="font-medium">Email:</span>
                            <span className="text-gray-800">{userData.userInfo.email}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span className="font-medium">Role:</span>
                            <span className="text-gray-800">{userData.role}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-gray-800">Post Count</h3>
                        <p className="text-3xl font-bold text-blue-600">{postCount}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-gray-800">Comments Count</h3>
                        <p className="text-3xl font-bold text-green-600">{commentsCount}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredStatsUser.map((stat, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                                <p className="text-xl font-medium text-gray-800">{stat.role}</p>
                                <p className="text-3xl font-bold text-blue-500">{stat.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
