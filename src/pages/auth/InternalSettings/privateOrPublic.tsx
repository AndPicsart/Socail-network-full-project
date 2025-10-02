import { useNavigate, useOutletContext } from "react-router-dom"
import { Axios } from "../../../lib/api"
import type { IContext } from "../../../types"

export const PublicOrPrivate = () => {
	const { account, setAccount } = useOutletContext<IContext>()
	const navigate = useNavigate()
	const handlePublicOrPrivate = () => {
		Axios
			.patch("/account/set")
			.then(response => {
				console.log(typeof (response.data.payload))
				setAccount({ ...account, isPrivate: response.data.payload })
				navigate("/profile")
			})
	}

	return (
		<div className="flex justify-center mt-6">
			<button
				onClick={handlePublicOrPrivate}
				className="transform transition-transform duration-300 ease-in-out
               hover:scale-190 active:scale-95 focus:outline-none
               focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 rounded-full"
				aria-label={account?.isPrivate ? "Switch to Public Mode" : "Switch to Private Mode"}
			>
				<img
					src={
						account?.isPrivate
							? import.meta.env.VITE_PRIVATE_PIC
							: import.meta.env.VITE_PUBLIC_PIC
					}
					alt={account?.isPrivate ? "Private Mode" : "Public Mode"}
					className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-lg"
					draggable={false}
				/>
			</button>
		</div>

	)
}
