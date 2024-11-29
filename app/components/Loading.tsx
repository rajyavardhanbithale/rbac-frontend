export default function Loading() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center h-screen bg-gray-100">
            <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-lg text-gray-600">Loading, please wait...</p>
        </div>
    )
}