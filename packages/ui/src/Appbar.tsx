import { Button } from "./button"

interface AppbarProps {
    user?: {
        name?: string | null;
    }
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any,
}
export const Appbar = ({
    user,
    onSignin,
    onSignout,
}: AppbarProps) => {
    return <div className="flex flex justify-between border-b px-4 py-2 bg-gradient-to-r from-indigo-200 via-purple-500 to-pink-200 shadow-lg ">
        <div className="text-3xl flex items-baseline justify-center font-extrabold">
            <p className="bont-extrabold tex-xl">
                Money
            </p>
            <p className="bont-extrabold bg-gradient-to-r from-blue-600 to-red-600 border-2 rounded-lg bg-clip-text text-transparent text-4xl">
                TXN
            </p>
        </div>
        <div className="flex flex-col justify-center pt-2 ">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}