export default function Loading() {
    return (
        <div className="p-4 space-y-8 animate-pulse">
            <div className="h-32 bg-gray-200 rounded-xl w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 h-[400px] bg-gray-200 rounded-xl" />
                <div className="h-[400px] bg-gray-200 rounded-xl" />
            </div>

            <div className="h-64 bg-gray-200 rounded-xl w-full" />
        </div>
    );
}
