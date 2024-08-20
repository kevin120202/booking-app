import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client"

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void
    isLoggedIn: boolean
}

const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

    // Query to check if the user is logged in by validating the token
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    })

    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            isLoggedIn: !isError
        }}>
            {/* Display toast notification if there is one */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
            {children}
        </AppContext.Provider>
    )
}

// Custom hook to access the AppContext
export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as AppContext
}