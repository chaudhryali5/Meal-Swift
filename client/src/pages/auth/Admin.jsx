import {toast} from "react-toastify"
import axios from "axios"
import { useForm } from "react-hook-form"
import { ADMIN_URI } from "../../resources/api"

const Admin = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const handleAdminLogin = async (data) => {
        try {
            const response = await axios.post(ADMIN_URI, data)
            if (response.data.status) {
                localStorage.setItem("adminToken", response.data.token)
                toast.success(response.data.message || "Admin Login Successfully")
                setTimeout(() => {
                    const token = response.data.token
                    window.location.href = `${import.meta.env.VITE_ADMIN_URL}?token=${token}`
                }, 1000)
            } else {
                toast.error(response.data.message || "You are not authorized")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="flex min-h-screen mt-20 items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 transition-all">
                <h2 className="text-3xl font-semibold text-center text-orange-600 mb-4">
                    Admin Portal
                </h2>
                <p className="text-center text-sm  mb-8">
                    Enter your credentials to access the dashboard
                </p>

                <form onSubmit={handleSubmit(handleAdminLogin)} className="space-y-6">
                    
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium  mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            placeholder="admin@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium  mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-black/70 transition-colors disabled:opacity-60"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Authenticating…" : "Sign In to Dashboard"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default Admin
