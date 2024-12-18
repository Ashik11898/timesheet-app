import useGetHotelList from "@/hooks/useGetHotelList";


type TransferListProps = {
  point: string;
  pointDetails:string
  pointLabel:string
  detailLabel:string
};

const HotelLocation = ({point,pointDetails,pointLabel,detailLabel}:TransferListProps) => {
  
  const {getHotelList,hotelList}=useGetHotelList()


  console.log("hotelList",hotelList);
  
  return (
    <>
    
    <div className="hotel-location-parent" onClick={()=>getHotelList({method:"GET",url:"https://api.mautourco.com/api/v2/accom/b2b/hotels/list",headers:{"Authorization":""}})}>
      <div>{point =="" ? pointLabel : point}</div>
      <div>{point =="" ? detailLabel : pointDetails}</div>
    </div>


    </>
  )
}

export default HotelLocation