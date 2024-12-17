import {useState} from "react"
import { axiosRequest } from "@/service/axiosHelper";

const useGetHotelList = () => {
 const [hotelList,setHotelList]=useState([])

    const getHotelList =async (payload)=>{
        if(hotelList.length === 0){
            payload.headers.Authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF9hZ2VuY3kiOjYsInVzZXJuYW1lIjoibm9lbGoiLCJpZF91c2VyIjoyMTY2LCJ1c2VyX2FjY2Vzc19jb2RlIjoiTVRDTyIsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJleHAiOjE3MzQ0MzAyODIsImlhdCI6MTczNDM0Mzg4Mn0.aRQy3hOzpfPmqXKTiR4tVEntuS0Ri5JMGbnw0UlH6Ak"
            let response = await axiosRequest(payload)
            setHotelList(response.result)
        }
        
        else{
            console.log("already have cache");
            return hotelList
        }
        
       
       
        
    }

    return{getHotelList,hotelList}

}

export default useGetHotelList