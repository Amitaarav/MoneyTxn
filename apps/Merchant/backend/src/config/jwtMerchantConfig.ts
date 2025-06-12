import dotenv from "dotenv"

dotenv.config()

const jwtMerchantSecret = process.env.JWT_MERCHANT_SECRET || "merchant-secret-key";

if(!jwtMerchantSecret){
    throw new Error("JWT_SECRET is not defined")
}

export default jwtMerchantSecret as string;