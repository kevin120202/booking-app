import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void // Function to call when the toast should be closed
}

function Toast({ message, type, onClose }: ToastProps) {

    // Automatically closes the toast after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)

        return () => {
            clearTimeout(timer) // Cleans up the timer if the component unmounts
        }
    }, [onClose])


    const styles = type === "SUCCESS" ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md" : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md"

    return (
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    )
}

export default Toast