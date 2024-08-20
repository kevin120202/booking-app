import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client"
import { useMutation, useQueryClient } from "react-query";

export type SignInFormData = {
    email: string;
    password: string;
}

function SignIn() {
    // QueryClient is used to manage and interact with the cache of queries.
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const { showToast } = useAppContext()

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>()

    // Mutation to handle user registration with React Query
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            // Invalidate the "validateToken" query to ensure the client no longer considers the user as authenticated.
            await queryClient.invalidateQueries("validateToken")

            showToast({ message: "Signed In!", type: "SUCCESS" })
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit(data => {
        mutation.mutate(data) // Triggers the mutation with form data
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border border-rounded w-full py-1 px-2 font-normal"
                    {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>

            <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border border-rounded w-full py-1 px-2 font-normal"
                    {...register("password", {
                        required: "This field is required", minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>

            <span className="flex justify-between items-center">
                <span className="text-sm">Not registered? <Link to="/register" className="underline">Create an account here</Link></span>
                <button type="submit" className="bg-gray-600 py-2 px-4 font-bold text-white">Sign In</button>
            </span>
            <p className="underline text-sm">Forgot password</p>
        </form>
    )
}

export default SignIn

/*********************
- Handles user login by collecting form data, validating inputs, and submitting to the server
- On successful login, displays a success message, navigates to the home page, and shows errors if any
- Utilizes React Hook Form for form management and React Query for handling mutations
*********************/