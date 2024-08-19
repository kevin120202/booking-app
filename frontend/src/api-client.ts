import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Sends a POST request to register a new user with the provided form data.
// If the registration fails, throws an error with the response message.
export const register = async (formData: RegisterFormData) => {
    const res = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const resBody = await res.json()

    if (!res.ok) {
        throw new Error(resBody.message)
    }
}

// Sends a GET request to validate the current user's authentication token.
// If the token is invalid, throws an error. Returns the response data if valid.
export const validateToken = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include", // Includes cookies with the request
    })

    if (!res.ok) {
        throw new Error("Token invalid")
    }

    return res.json()
}
