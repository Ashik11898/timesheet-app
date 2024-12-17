import { axiosRequest } from "@/service/axiosHelper"
import { AxiosRequestConfig } from "axios";



const useLogin = () => {
  
const loginUser =async(config: AxiosRequestConfig<any>)=>{
    const data = await axiosRequest(config)
    console.log("data",data); 
}


return {loginUser}
}

export default useLogin