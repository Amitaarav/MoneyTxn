import jwtMerchantConfig from "./jwtMerchantConfig";
import jwtUserSecret from "./jwtUserConfig";


// go deep in this concept
export default class AuthService {
    static jwtUserSecret = jwtUserSecret;
    static jwtMerchantSecret = jwtMerchantConfig
}