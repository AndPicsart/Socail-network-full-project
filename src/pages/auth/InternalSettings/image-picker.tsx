import { useRef, useState } from "react"
import { Axios } from "../../../lib/api"
import { useNavigate, useOutletContext } from "react-router-dom"
import type { IContext } from "../../../types"

export const ImagePicker = () => {
	const {account,setAccount} = useOutletContext<IContext>()
	const picInput = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const [error,setError] = useState("")
	const [preview,setPreview] = useState("")
	const handlePreview = () => {
		if(picInput.current?.files){
			const file = picInput.current.files[0]
			/* Nayel ays classy FileReader*/
			const reader = new FileReader()
			reader.onload = () => {
				setPreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleUpload = () => {
		console.log(picInput.current?.files)
		if (picInput.current?.files?.[0]){
			const file = picInput.current.files[0]
			const form = new FormData()
			form.append("picture",file)

			Axios
			.patch("/profile/upload",form)
			.then(response => {
				console.log(response.data.payload)
				setAccount({...account,picture:response.data.payload})
				navigate("/profile")
			})
		}
		else{
			setPreview("")
			setError("Fail! Input Image")
		}
	}
	return <div className="mb-8">
		<h3 className="text-lg font-extrabold text-purple-400 mb-4 select-none drop-shadow-md">
			Upload Image
		</h3>
		{error && <h2 className="bg-red-600 text-white text-xl font-bold text-center py-4 px-6 rounded-lg shadow-lg border-2 border-red-800 my-6 animate-pulse">{error}</h2>}
		<button
			type="button"
			className="bg-purple-600 hover:bg-purple-700 active:scale-95 active:shadow-lg
      text-white font-semibold py-3 px-6 rounded-lg shadow-md transition
      focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
			onClick={() => picInput.current?.click()}
		>
			Choose a Picture
		</button>

		<input
			type="file"
			accept="image/*"
			className="hidden"
			ref={picInput}
			onChange={handlePreview}
		/>

		{preview && (
			<div
				className="mt-6 p-5 border border-gray-700 rounded-xl bg-gray-800 shadow-lg
        animate-fade-in max-w-sm mx-auto"
			>
				<p className="text-sm text-gray-300 font-semibold mb-3 select-none">
					Preview:
				</p>

				<div className="w-full max-w-xs mx-auto mb-6 rounded-lg overflow-hidden border border-gray-700 shadow-inner">
					<img
						src={preview}
						alt="Selected preview"
						className="w-full object-cover rounded-lg"
					/>
				</div>

				<div className="flex justify-center gap-4">
					<button
						className="bg-green-600 hover:bg-green-700 active:scale-95 active:shadow-lg
            text-white font-semibold px-5 py-2 rounded-lg shadow-md transition
            focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
						onClick={handleUpload}
					>
						Upload
					</button>

					<button
						className="bg-red-600 hover:bg-red-700 active:scale-95 active:shadow-lg
            text-white font-semibold px-5 py-2 rounded-lg shadow-md transition
            focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
						onClick={() => setPreview("")}
					>
						Cancel
					</button>
				</div>
			</div>
		)}
	</div>

}