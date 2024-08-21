import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection"
import TypeSection from "./TypeSection"
import FacilitiesSection from "./FacilitiesSection"
import GuestsSection from "./GuestsSection"
import ImagesSection from "./ImagesSection"

export type HotelFormData = {
    name: string
    city: string
    country: string
    description: string
    type: string
    pricePerNight: number
    starRating: number
    facilities: string[]
    imageFiles: FileList
    adultCount: number
    childCount: number
}

function ManageHotelForm() {
    const formMethod = useForm<HotelFormData>()
    const handleSubmit = formMethod.handleSubmit

    const onSubmit = handleSubmit(data => {
        // mutation.mutate(data) // Trigger the mutation with form data
        console.log(typeof data.adultCount);
    })


    return (
        <FormProvider {...formMethod}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-yellow-300 text-black px-6 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer text-xl"
                    >Save</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm