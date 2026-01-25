export default function Loading() {
    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-3">
                    <div className="h-10 bg-gray-200 rounded w-64" />
                    <div className="h-6 bg-gray-200 rounded w-48 opacity-60" />
                </div>
                <div className="flex gap-2">
                    <div className="h-10 bg-gray-200 rounded w-24" />
                    <div className="h-10 bg-gray-200 rounded w-32" />
                </div>
            </div>

            <div className="h-24 bg-gray-200 rounded-2xl w-full" />

            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded-xl w-full" />
                ))}
            </div>
        </div>
    );
}
