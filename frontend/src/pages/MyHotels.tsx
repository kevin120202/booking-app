import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import { BsBuilding, BsMap } from "react-icons/bs"
import { BiHotel, BiMoney, BiStar } from "react-icons/bi"

function MyHotels() {
    const { showToast } = useAppContext()

    const { data: hotelData, isLoading } = useQuery("myHotels", apiClient.fetchMyHotels, {
        onError: () => {
            showToast({ message: "Failed to fetch hotels", type: "ERROR" })
        }
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (hotelData?.length === 0) {
        return <span>No hotel data found</span>
    }

    return (
        <div className="space-y-5">
            <span className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link to="/add-hotel" className="bg-yellow-300 text-black px-6 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer text-xl disabled:bg-gray-500">Add Hotels</Link>
            </span>

            <div className="grid grid-cols-1 gap-8">
                {hotelData?.map(hotel => (
                    <div className="border border-slate-300 flex flex-col justify-between rounded-lg p-8 gap-5 text-sm
                    
                    " key={hotel._id}>
                        <h2 className="text-2xl font-bold">{hotel.name}</h2>
                        <div className="whitespace-pre-line">{hotel.description}</div>
                        <div className="grid gap-2 
                        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                        ">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                                <BsMap className="mr-1" />
                                {hotel.city}, {hotel.country}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                                <BsBuilding className="mr-1" />
                                {hotel.type}
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                                <BiMoney className="mr-1" />
                                ${hotel.pricePerNight} per night
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                                <BiHotel className="mr-1" />
                                ${hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center text-sm">
                                <BiStar className="mr-1" />
                                {hotel.starRating} star rating
                            </div>
                        </div>
                        <span className="flex justify-end">
                            <Link to={`/edit-hotel/${hotel._id}`} className="bg-yellow-300 text-black px-6 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer text-xl disabled:bg-gray-500">View Details</Link>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels