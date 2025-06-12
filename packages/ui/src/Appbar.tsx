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
    return <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 flex justify-between border-b px-4 py-2">
        <div className="text-xl flex items-center justify-center font-bold">
            <p className="bont-extrabold tex-xl">
                Money
            </p>
            <p className="bont-extrabold text-[#6a51a6] text-2xl">
                TXN
            </p>
        </div>
        <div className="flex flex-col justify-center pt-2 ">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}