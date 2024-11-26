const getRandomBorderColor = (): string => {
    const colors = ['border-red-500', 'border-blue-500', 'border-green-500', 'border-yellow-500', 'border-purple-500', 'border-pink-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };
  

  export default function PostCard({ post }: { post: Post }) {
    const randomBorderColor = getRandomBorderColor();
  
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
      </div>
    );
  }