import HotelLocation from './HotelLocation';
import { TRANSFER_LIST } from '@/constants';

const SearchSelectDropdown = () => {
    return (
        <div >
            {TRANSFER_LIST.map((list,ind) => (
                <div key={ind} className='dropdown-row'>
                    <HotelLocation point={list.pickup_Point} pointDetails={list.pickup_Point_details} pointLabel={list.Points_Label[0]} detailLabel={list.Points_Label[2]}/>
                    <HotelLocation point={list.destination_Point} pointDetails={list.destination_Point_details} pointLabel={list.Points_Label[1]} detailLabel={list.Points_Label[3]} />
                </div>
            ))}
        </div>
    );
};

export default SearchSelectDropdown;
