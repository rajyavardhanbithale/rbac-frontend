'use client'

import { useTriggerStore } from "@/store/useTriggerStore";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";



export default function PostModal() {
    const { isModalOpen, setIsModalOpen: handleClose } = useTriggerStore();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axiosInstance.post(`/posts`, {
                title,
                content
            });

            const data = response.data;

            console.log('Post created:', data);
            handleClose(true);

            setTitle('');
            setContent('');
        } catch (error: any) {
            setError(error.message || 'Failed to create the post.');
        } finally {
            setLoading(false);
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg transform translate-y-0">
                <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Enter post title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                            placeholder="Enter post content"
                        />
                    </div>

                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleClose(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
