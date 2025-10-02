import { useEffect, useState } from "react"
import { Axios } from "../../lib/api"
import type { IUser } from "../../types"
import { Image } from "../../lib/helpers/image"

export const Request = () => {
	const [requests, setRequests] = useState<IUser[]>()

	useEffect(() => {
		Axios.get("/requests").then((response) => {
			console.log(response.data.payload)
			setRequests(response.data.payload)
		})
	}, [])
	const handleAccept = (id : number | undefined) => {
		Axios
		.patch("/requests/accept/" + id)
		.then(response => {
			console.log(response.data)
			setRequests(requests?.filter(req => req.id != id))
		})
	}
	const handleCancle = (id : number | undefined) => {
		Axios
		.patch("/requests/accept/" + id)
		.then(response => {
			console.log(response.data)
			setRequests(requests?.filter(req => req.id != id))
		}) 
	}
	return (
		<>
			<h2 className="text-3xl font-bold text-purple-400 mb-8 neon-flicker">
				Friend Requests
			</h2>

			{
				requests?.[0] ? <div className="space-y-6">
					{requests?.map((req) => (
						<div
							key={req.user?.id}
							className="group bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-3xl border border-purple-600 shadow-xl hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
						>
							<div className="flex items-center justify-between gap-4 flex-wrap">
								{/* User Info */}
								<div className="flex items-center gap-5">
									<Image
										src={req.user?.picture}
										alt={req.user?.name}
										className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-md object-cover transition-all duration-500 group-hover:shadow-purple-500"
									/>

									<div>
										<p className="text-xl font-semibold text-gray-100 group-hover:text-purple-300 transition duration-300">
											{req.user?.name}
										</p>
										<span className="text-sm text-gray-400 group-hover:text-gray-300 transition duration-300">
											@{`${req?.user?.name}${req?.user?.surname}` || "anonymous"}
										</span>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3 mt-4 md:mt-0">
									{/* Accept */}
									<button
										onClick={() => handleAccept(req?.id)}
										className="relative w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 
									hover:from-green-400 hover:to-emerald-500 shadow-md hover:shadow-green-400/40 
									transition-all duration-300 transform hover:scale-110 focus:outline-none animate-glow"
										title="Accept"
									>
										<span className="text-white text-xl">✅</span>
									</button>

									{/* Cancel */}
									<button
										onClick={() => handleCancle(req?.id)}
										className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-pink-600 
									hover:from-red-400 hover:to-pink-500 shadow-md hover:shadow-pink-400/40 
									transition-all duration-300 transform hover:scale-110 focus:outline-none animate-glow"
										title="Cancel"
									>
										<span className="text-white text-xl">✖</span>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
				: <div>
					<p>Not Requests</p>
				</div>
			}

			{/* Custom Animations */}
			<style>{`
				@keyframes flicker {
					0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
						opacity: 1;
						text-shadow:
							0 0 8px #a78bfa,
							0 0 15px #7c3aed,
							0 0 20px #c4b5fd,
							0 0 30px #a78bfa;
					}
					20%, 22%, 24%, 55% {
						opacity: 0.85;
						text-shadow: none;
					}
				}
				.neon-flicker {
					animation: flicker 3s infinite alternate;
				}

				@keyframes glow {
					0%, 100% {
						box-shadow: 0 0 6px rgba(255,255,255,0.1), 0 0 15px rgba(124,58,237,0.4), 0 0 30px rgba(124,58,237,0.2);
					}
					50% {
						box-shadow: 0 0 12px rgba(255,255,255,0.2), 0 0 25px rgba(167,139,250,0.6), 0 0 40px rgba(167,139,250,0.3);
					}
				}
				.animate-glow {
					animation: glow 2.8s ease-in-out infinite alternate;
				}
			`}</style>
		</>
	)
}
