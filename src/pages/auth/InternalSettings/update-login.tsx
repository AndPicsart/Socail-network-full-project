import { useForm, type SubmitHandler } from "react-hook-form"
import type { IResponse, IUpdateLogin } from "../../../types"
import { Axios } from "../../../lib/api"
import { useState } from "react"



export const UpdateLogin = () => {
	const {register,handleSubmit,formState:{errors}} = useForm<IUpdateLogin>()
	const [success,setSucces] = useState("")
	const [fail,setFail] = useState("")
	const handleSave:SubmitHandler<IUpdateLogin> = data => {
		console.log(data)
		Axios
		.patch<IResponse>("/update/login",data)
		.then(response => {
			setSucces(`${response.data.message}`)
		})
		.catch(response => {
			setFail(`${response.response.data.message}`)
		})
	}
	return (
		<>
			<h1 className="text-2xl font-extrabold text-purple-400 mb-6 drop-shadow-md select-none">
				Update Login
			</h1>

			{success && (
				<p className="mb-5 text-sm text-green-500 font-semibold bg-green-900 bg-opacity-40 px-5 py-3 rounded-lg shadow-inner animate-fade-in">
					{success}
				</p>
			)}
			{fail && (
				<p className="mb-5 text-sm text-red-500 font-semibold bg-red-900 bg-opacity-40 px-5 py-3 rounded-lg shadow-inner animate-fade-in">
					{fail}
				</p>
			)}

			<form onSubmit={handleSubmit(handleSave)} className="space-y-6">
				{/* New Login */}
				<div>
					{errors.newLogin && (
						<p className="mt-1 text-sm text-red-500 font-medium italic select-none">
							{errors.newLogin.message}
						</p>
					)}

					<label className="block text-gray-300 text-sm font-medium mb-2">
						New Login
					</label>
					<input
						{...register("newLogin", { required: "Please fill the New Login" })}
						type="text"
						placeholder="Enter new login"
						className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-4 py-3 placeholder-gray-500
          focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent
          transition duration-300 shadow-md hover:shadow-purple-600"
					/>
				</div>

				{/* Password */}
				<div>
					{errors.password && (
						<p className="mt-1 text-sm text-red-500 font-medium italic select-none">
							{errors.password.message}
						</p>
					)}

					<label className="block text-gray-300 text-sm font-medium mb-2">
						Password
					</label>
					<input
						{...register("password", { required: "Please input password" })}
						type="password"
						placeholder="Enter your password"
						className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-4 py-3 placeholder-gray-500
          focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent
          transition duration-300 shadow-md hover:shadow-purple-600"
					/>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] active:shadow-lg
        text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300
        focus:ring-4 focus:ring-purple-400 focus:outline-none select-none"
				>
					Save
				</button>
			</form>
		</>
	)
}
