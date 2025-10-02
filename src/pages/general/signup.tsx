import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { IResponse, NewUser } from "../../types";
import { Axios } from "../../lib/api";
import axios from "axios";
import { useState } from "react";

export const SignUp = () => {
	const {register,handleSubmit,formState:{errors}} = useForm<NewUser>()
	const [error,setError] = useState("")
	const navigate = useNavigate()
	const handleSignup:SubmitHandler<NewUser> = data => {
		Axios
		.post<IResponse>("/signup",data)
		.then(() => {
			navigate("/login")
		})
		.catch(error => {
			if(axios.isAxiosError(error)){
				const errorResp = error.response?.data as IResponse
				setError(`${errorResp.message}`)
			}
		})	
	}
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
			<div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 space-y-6">
				<h1 className="text-3xl font-bold text-center text-white">SignUp</h1>

				<form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
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
					<div>
						{errors.name && <p className="text-red-400">{errors.name.message}</p>}

						<label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
							Name
						</label>
						<input
							{...register("name",{required:"Please fill the name"})}
							type="text"
							id="name"
							name="name"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="John"
							
						/>
					</div>

					<div>
						{errors.surname && <p className="text-red-400">{errors.surname.message}</p>}

						<label htmlFor="surname" className="block text-sm font-medium text-gray-300 mb-1">
							Surname
						</label>
						<input
							{...register("surname", { required: "Please fill the surname" })}

							type="text"
							id="surname"
							name="surname"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="Doe"
							
						/>
					</div>

					<div>
						{errors.login && <p className="text-red-400">{errors.login.message}</p>}

						<label htmlFor="login" className="block text-sm font-medium text-gray-300 mb-1">
							Login
						</label>
						<input
							{...register("login", { required: "Please fill the login" })}

							type="text"
							id="login"
							name="login"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="johndoe123"
							
						/>
					</div>

					<div>
						{errors.password && <p className="text-red-400">{errors.password.message}</p>}
						<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
							Password
						</label>
						<input
							{...register("password", { required: "Please fill the password" ,minLength:{value:8, message:"Password is to shorts"}})}

							type="password"
							id="password"
							name="password"
							className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							placeholder="••••••••"
							
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-md transition duration-300"
					>
						Sign Up
					</button>
				</form>

				<p className="text-center text-sm text-gray-400">
					Already have an account?{" "}
					<Link to="/login" className="text-purple-400 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
};
