import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children }: CardProps) {
    return (
        <div className={`bg-gradient-to-b from-gray-700 to-purple-900 rounded-lg shadow-md p-6`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "text-gray-200" }: CardProps) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "text-gray-200" }: CardProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = "text-gray-200" }: CardProps) {
    return (
        <h2 className={`text-xl font-semibold ${className}`}>
            {children}
        </h2>
    );
}
