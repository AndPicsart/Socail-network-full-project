import { useEffect, useState } from "react"
import { Image } from "../../lib/helpers/image"
import type { IUser } from "../../types"
import { Axios } from "../../lib/api"
import { useNavigate } from "react-router-dom"

export const Followers = () => {
	const [users,setUsers] = useState<IUser[]>()
	const navigate = useNavigate()
	useEffect(() => {
		Axios
		.get("/followers")
		.then(response => {
			setUsers(response.data.payload)
		})

	},[])
	return <>
		<div className="max-w-4xl mx-auto py-10 px-4">
			<h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fadeIn">
				Followers {users?.length}
			</h2>

			<div className="space-y-6 animate-fadeIn">
				{users?.map((user, i) => (
					<div
						key={user.id}
						className="flex items-center justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 transition-all duration-500 group animate-slideUp"
						style={{ animationDelay: `${i * 120}ms` }} // staggered animation
					>
						{/* Left Section */}
						<div className="flex items-center gap-5">
							<Image
								src={user.picture ? user.picture : import.meta.env.VITE_DEFAULT_PIC}
								alt="Profile Picture"
								className="w-16 h-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-500 transform group-hover:scale-110"
							/>
							<div>
								<p className="text-gray-100 font-semibold text-xl group-hover:text-purple-300 transition-colors duration-500">
									{user.name}
								</p>
								<span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-500">
									@{user.name + user.surname || "anonymous"}
								</span>
							</div>
						</div>

						{/* Right Section (Follow Back button) */}
						<button
							onClick={() => navigate("/profile/" + user.id)}
							className="relative overflow-hidden text-sm font-semibold bg-gray-800 border border-gray-700 text-gray-300 px-6 py-2 rounded-xl
							hover:text-white transition-all duration-500 group-hover:shadow-lg active:scale-95"
						>
							<span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
							<span className="relative z-10">Follower Profile</span>
						</button>
					</div>
				))}
			</div>
		</div>
	</>
	
}