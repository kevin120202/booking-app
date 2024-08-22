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

type Props = {
    onSave: (hotelFormdata: FormData) => void
    isLoading: boolean
}

function ManageHotelForm({ onSave, isLoading }: Props) {
    const formMethod = useForm<HotelFormData>()
    const { handleSubmit } = formMethod

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData();

        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData)
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
                        disabled={isLoading}
                        type="submit"
                        className="bg-yellow-300 text-black px-6 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer text-xl disabled:bg-gray-500"
                    >{isLoading ? "Saving..." : "Save"}</button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm