export function Center ({ children }: { children: React.ReactNode }) {

    return <div 
        className="flex justify-center items-center h-full">
            {children}
        </div>
    
};
