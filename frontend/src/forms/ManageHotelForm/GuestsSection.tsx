import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

function GuestsSection() {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="flex flex-col md:flex-row gap-5 bg-gray-300 p-6">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Adults
                    <input type="number" className="border border-rounded w-full py-1 px-2 font-normal"
                        {...register("adultCount", { required: "This field is required" })}
                        min={1}
                        placeholder="1"
                    />
                    {errors.adultCount && (
                        <span className="text-red-500">{errors.adultCount.message}</span>
                    )}
                </label>
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Children
                    <input type="number" className="border border-rounded w-full py-1 px-2 font-normal"
                        {...register("childCount", { required: "This field is required" })}
                        min={0}
                        placeholder="0"
                    />
                    {errors.childCount && (
                        <span className="text-red-500">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
        </div>
    )
}

export default GuestsSection