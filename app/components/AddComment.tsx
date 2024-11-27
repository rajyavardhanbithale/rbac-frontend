'use client'

import { useAuthStore } from '@/store/useAuthStore';
import { Comment } from '@/types';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AddComment({ postId }: { postId: string }) {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const { role } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;
        setIsSubmitting(true);
        try {
            const response = await axiosInstance.post('/posts/comments', {
                postId,
                content: newComment,
            });

            if (response.status === 201) {
                setNewComment('');
                toast.success('Comment submitted successfully!');
                fetchComments();
            }
        } catch (error: any) {
            if (error.status === 401 || error.status === 403) {
                toast.error('You must be logged in to post a comment.');
            }
        }

        setIsSubmitting(false);
    };

    const fetchComments = async () => {
        const response = await axiosInstance.get(`/posts/comments/${postId}`);
        setComments(response.data);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
            <div className="space-y-3">
                {comments?.map((comment) => (
                    <div key={comment._id} className="relative p-4 bg-gray-100 rounded-lg shadow-sm">
                        <p className="text-gray-800 font-medium">{comment.userId.name}</p>
                        <p className="text-gray-600">{comment.content}</p>
                        {role !== 'user' && (
                            <div className="bg-red-500 text-xl rounded-full px-2 w-fit text-white font-semibold absolute top-2 right-2">X</div>
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 mt-5">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Add a comment..."
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className={`w-full p-3 bg-blue-500 text-white rounded-md ${isSubmitting ? 'opacity-50' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Post Comment'}
                </button>
            </form>
        </div>
    );
};
