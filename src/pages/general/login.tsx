import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { AuthUser} from "../../types";
import { Axios } from "../../lib/api";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
	const {register,handleSubmit,formState:{errors}} = useForm<AuthUser>()
	const navigate = useNavigate()
	const [error,setError] = useState("")
	const handleLogin:SubmitHandler<AuthUser> = (data) => {
		console.log(data)
		Axios.post("/login",data)
		.then((response) => {
			setError("")
			console.log(response.data)
			navigate("/profile")
		})
		.catch(error => {
			if(axios.isAxiosError(error)){
				let errorLogin = error.response?.data
				setError(errorLogin.message)
			}
			
		})
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
			<div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
				<h1 className="text-3xl font-bold text-center text-white">Login</h1>
				{error && (
					<div className="mt-3 rounded-xl bg-red-50 border border-red-200 p-3 flex items-center gap-2 shadow-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 text-red-500"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 
        8-8 8 3.582 8 8zm-9-3a1 1 0 112 0v4a1 1 
        0 11-2 0V7zm1 8a1.25 1.25 0 100-2.5A1.25 
        1.25 0 0010 15z"
								clipRule="evenodd"
							/>
						</svg>
						<p className="text-sm font-medium text-red-700">{error}</p>
					</div>
				)}
				<form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
					<div>
						{errors.login && (
							<div className="mt-1 inline-block rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 border border-red-200">
								{errors.login.message}
							</div>
						)}

						<label htmlFor="login" className="block text-sm font-medium text-gray-300 mb-1">
							Login
						</label>
						<input
							{...register("login",{required:"Please fill login"})}
							type="text"
							id="login"
							name="login"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="yourusername"

						/>
					</div>

					<div>
						{errors.password && (
							<div className="mt-1 inline-block rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 border border-red-200">
								{errors.password.message}
							</div>
						)}
						<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
							Password
						</label>
						<input
							{...register("password", { required: "Please fill password" })}
							type="password"
							id="password"
							name="password"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="••••••••"

						/>
					</div>

					<div className="flex items-center justify-between text-sm text-gray-400">
						<label className="flex items-center space-x-2">
							<input type="checkbox" className="form-checkbox h-4 w-4 text-purple-500 bg-gray-800 border-gray-600 rounded focus:ring-0" />
							<span>Remember me</span>
						</label>
						<a href="#" className="hover:underline text-purple-400">
							Forgot password?
						</a>
					</div>

					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-md transition duration-300"
					>
						Log In
					</button>
				</form>

				<p className="text-center text-sm text-gray-400">
					Don't have an account?{" "}
					<Link to="/" className="text-purple-400 hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};
