import { axiosRequest } from "@/service/axiosHelper"
import { AxiosRequestConfig } from "axios";

const useRefreshTokens = () => {
  
    const refreshToken =async(config: AxiosRequestConfig<any>)=>{
        const data = await axiosRequest(config)
        console.log(data);
        
    }
    return refreshToken

}

export default useRefreshTokens