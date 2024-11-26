'use client'

import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";

interface PostModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

export default function PostModal({ isOpen, handleClose }: PostModalProps) {
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
            handleClose(); 

            setTitle('');
            setContent('');
        } catch (error: any) {
            setError(error.message || 'Failed to create the post.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;  // If modal is not open, don't render it

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Add New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-semibold mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-semibold mb-2">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={4}
                            required
                        ></textarea>
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="flex justify-between gap-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg ${loading ? 'bg-gray-300' : 'bg-blue-500'} text-white`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
