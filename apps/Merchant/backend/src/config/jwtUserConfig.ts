import dotenv from "dotenv"

dotenv.config()

const jwtUserSecret = process.env.JWT_USER_SECRET || "user_secret_key";

if(!jwtUserSecret){
    throw new Error("JWT_SECRET is not defined")
}

export default jwtUserSecret as string;