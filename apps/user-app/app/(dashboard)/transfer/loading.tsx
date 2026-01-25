export default function Loading() {
    return (
        <div className="p-4 space-y-8 animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-48 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                    <div className="h-80 bg-gray-200 rounded-xl" />
                    <div className="h-80 bg-gray-200 rounded-xl" />
                </div>
                <div className="space-y-4">
                    <div className="h-40 bg-gray-200 rounded-xl" />
                    <div className="h-96 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
