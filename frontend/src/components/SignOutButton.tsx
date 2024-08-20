import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"

function SignOutButton() {
    // QueryClient is used to manage and interact with the cache of queries.
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const { showToast } = useAppContext()

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            // Invalidate the "validateToken" query to ensure the client no longer considers the user as authenticated.
            await queryClient.invalidateQueries("validateToken")

            showToast({ message: "Signed Out!", type: "SUCCESS" })
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return (
        <button className="flex items-center px-3 py-2 font-bold hover:bg-gray-100 hover:cursor-pointer bg-yellow-300 text-black" onClick={handleClick}>Sign out</button>
    )
}

export default SignOutButton