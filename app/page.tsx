'use client'
import Link from "next/link";
import PostCard from "./components/PostCard";
import { BASE_API_URL } from "@/utils/base";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Loading from "./components/Loading";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosInstance.get(`/posts`);
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  if(!posts.length) return <Loading />;


  return (
    <div className="container mx-auto p-5 mt-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-wide">
          Welcome to the Post Showcase
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover the latest posts from our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
        {posts.map((post: Post) => (
          <Link href={`/post/${post._id}`} key={post._id}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>

    </div>
  );
}
