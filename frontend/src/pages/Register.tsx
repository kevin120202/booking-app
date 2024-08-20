import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const navigate = useNavigate()
    const { showToast } = useAppContext()

    // Initialize form handling with React Hook Form
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

    // Mutation to handle user registration with React Query
    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" })
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const onSubmit = handleSubmit(data => {
        mutation.mutate(data) // Trigger the mutation with form data
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text" className="border border-rounded w-full py-1 px-2 font-normal"
                        {...register("firstName", { required: "This field is required" })}
                    />
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border border-rounded w-full py-1 px-2 font-normal"
                        {...register("lastName", { required: "This field is required" })}
                    />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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

            <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border border-rounded w-full py-1 px-2 font-normal"
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            } else if (watch("password") !== val) {
                                return "Your passwords do not match"
                            }
                        }
                    })}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>

            <span className="flex gap-4 items-center">
                <button type="submit" className="bg-gray-600 py-2 px-4 font-bold text-white">Create Account</button>
                <Link to="/sign-in">Sign In to your account</Link>
            </span>
        </form>
    )
}

export default Register


/*********************
- Handles user registration by collecting form data, validating inputs, and submitting to the server
- On successful registration, displays a success message, navigates to the home page, and shows errors if any
- Utilizes React Hook Form for form management and React Query for handling mutations
*********************/