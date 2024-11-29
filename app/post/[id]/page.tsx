'use client'

import AddComment from "@/app/components/AddComment";
import Loading from "@/app/components/Loading";
import { Post } from "@/types";
import { BASE_API_URL } from "@/utils/base";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const [id, setId] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);


  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      if (unwrappedParams && unwrappedParams.id) {
        setId(unwrappedParams.id);
      }
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const response = await fetch(`${BASE_API_URL}/posts/${id}`);
        const data = await response.json();
        setPost(data);
      };
      fetchPost();
    }
  }, [id]);


  if (!post) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-10 mt-28">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-sm text-gray-500">
          By {post.authorID.name} | {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg text-gray-700">{post.content}</p>
      </div>

      <div className="space-y-4">
        {id && (

          <AddComment postId={id} />
        )}
      </div>
    </div>
  );
}
