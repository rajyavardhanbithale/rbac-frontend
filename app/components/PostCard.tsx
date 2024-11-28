'use client'
import { useAuthStore } from "@/store/useAuthStore";
import { Post } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";

const getRandomBorderColor = (): string => {
  const colors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500', 'border-pink-500'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
};


export default function PostCard({ post }: { post: Post }) {
  const randomBorderColor = getRandomBorderColor();
  const { role } = useAuthStore();

  const deletePost = async () => {
    try {
      await axiosInstance?.delete(`/posts/${post._id}`);
      toast.success("Post deleted successfully.");
    } catch (error: any) {
      toast.error("Error deleting post data.");

    }
  };

  return (
    <div className={`max-w-sm w-full bg-white shadow-lg rounded-2xl border-[3px] ${randomBorderColor} p-6 mb-8 hover:scale-[1.03] transform transition-all duration-300 ease-in-out`}>
      <h3 className="text-2xl font-bold text-gray-800 hover:text-${randomBorderColor} transition-colors duration-300">{post.title}</h3>
      <p className="text-gray-600 mt-4">{post.content}</p>
      <div className="mt-6">
        <strong className="block text-sm text-gray-500">Author:</strong>
        <p className="text-sm text-gray-500">{post.authorID.name} ({post.authorID.email})</p>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Created at: {new Date(post.createdAt).toLocaleString()}
      </p>

      {(role === 'admin') && (
        <div
          onClick={(e)=>{e.preventDefault(); deletePost()}}
          className="bg-rose-500 text-base cursor-pointer rounded-full px-2 w-fit text-white font-semibold absolute top-2 right-2">
          X
        </div>
      )}
    </div>
  );
}