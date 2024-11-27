import AddComment from "@/app/components/AddComment";
import { Post } from "@/types";
import { BASE_API_URL } from "@/utils/base";

export default async function Page({ params }: { params: { id: string } }) {

  const { id } = await params;

  const response = await fetch(`${BASE_API_URL}/posts/${id}`);
  const post = await response.json() as Post;

  return (
    <div className="max-w-4xl mx-auto p-5 space-y-10 mt-28">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-sm text-gray-500">By {post.authorID.name} | {new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="text-lg text-gray-700">{post.content}</p>
      </div>

      <div className="space-y-4">
        <AddComment postId={id} />
      </div>
    </div>
  )
}
