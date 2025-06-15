import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    };
    onSignin: () => void;
    onSignout: () => void;
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
}: AppbarProps) => {
    return (
        <div className="flex justify-between items-center border-b px-4 py-2 bg-gradient-to-r from-indigo-200 via-purple-500 to-pink-200 shadow-lg">
            <div className="text-3xl font-extrabold flex items-center gap-1">
                <span className="text-xl">Money</span>
                <span className="bg-gradient-to-r from-blue-600 to-red-600 border-2 rounded-lg bg-clip-text text-transparent text-4xl px-1">
                    TXN
                </span>
            </div>
            <div>
                <Button onClick={user ? onSignout : onSignin}>
                    {user ? "Logout" : "Login"}
                </Button>
            </div>
        </div>
    );
};
