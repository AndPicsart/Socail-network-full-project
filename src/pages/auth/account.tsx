import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Axios } from "../../lib/api"
import type { IAccount } from "../../types"
import { Image } from "../../lib/helpers/image"

export const Account = () => {
	const { id } = useParams()
	const [user, setUser] = useState<IAccount | null>(null)
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get("/account/" + id)
			.then(response => {
				console.log(response.data.payload, "Account info")
				setUser(response.data.payload)
			})
			.catch(() => setUser(null))
	}, [id])

	const handleFollow = () => {
		Axios.post("/account/follow/" + id).then(response => {
			if (user) {
				setUser({
					...user,
					connection: {
						...user.connection,
						following: response.data.status ? true : false,
					},
				})
			}
		})
	}

	const handleConnection = () => {
		if (!user) return ""
		if (!user.connection.following && !user.isPrivate && !user.connection.requested) return "Follow"
		if (user.connection.following) return "Unfollow"
		if (user.isPrivate && !user.connection.requested) return "Request"
		if (user.isPrivate && user.connection.requested) return "Cancel Request"
		if (user.connection.followsMe) return "Follow Back"
		return "Follow"
	}

	return (
		<>
			{user ? (
				<div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 space-y-10">
					<div className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-700/50">
						{/* Profile Section */}
						<div className="flex items-center gap-8">
							<Image
								src={user.picture}
								className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg object-cover transition-transform duration-300 hover:scale-110 hover:shadow-purple-600/80"
								alt={`${user.name} ${user.surname}`}
							/>

							<div className="flex-1">
								<div className="flex items-center gap-4 mb-4">
									<h1 className="text-2xl font-bold text-white transition-colors duration-300">
										{`${user.name} ${user.surname}`}
									</h1>
								</div>

								<div className="flex gap-8 text-gray-300">
									{[
										{ label: "posts", value: user.posts?.length || 0 },
										{ label: "followers", value: user.followers?.length || 0 },
										{ label: "following", value: user.following?.length || 0 },
									].map(({ label, value }) => (
										<p
											key={label}
											className="cursor-default hover:text-purple-400 transition-colors duration-300 select-none"
											title={label}
										>
											<span className="font-semibold text-purple-400 text-lg">{value}</span> {label}
										</p>
									))}
								</div>

								<div className="mt-4">
									<p className="text-gray-100 font-medium transition-colors duration-300 hover:text-purple-300 cursor-default">
										{"No bio yet..."}
									</p>
									<p className="text-gray-400 text-sm mt-1 select-text">
										@{`${user.name}${user.surname}`}
									</p>
								</div>
							</div>
						</div>

						<div className="mt-6 flex justify-center">
							<button
								onClick={handleFollow}
								className={`
                  px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1
                  transform hover:scale-105 active:scale-95
                  ${user.connection?.following || user.connection?.requested
										? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/70 hover:shadow-red-600/80"
										: "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/70 hover:shadow-purple-700/80"
									}
                `}
							>
								{handleConnection()}
							</button>
						</div>
					</div>

					{/* Posts Section */}
					{user.posts.length > 0 ? (
						<div className="w-full max-w-5xl">
							<h2 className="text-xl font-bold text-purple-400 mb-6 animate-fade-in">
								Posts
							</h2>

							{/* Grid Layout for Instagram-like posts */}
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
								{user.posts.map((post, idx) => (
									<button key={user.id} onClick={() => navigate("/profile/post/" + post.id + "/" + user.id)}>
										<div
											key={post.id}
											className="group relative aspect-square rounded-xl overflow-hidden border border-gray-700 bg-gray-900 shadow-md hover:shadow-purple-600/50 transform transition-all duration-300 hover:scale-[1.03]"
											style={{
												animation: `fadeUp 0.5s ease forwards`,
												animationDelay: `${idx * 0.07}s`,
												animationFillMode: 'both',
											}}
										>
											{post.picture ? (
												<img
													src={import.meta.env.VITE_BASE + post.picture}
													alt={post.title}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-gray-500 text-sm italic">
													No Image
												</div>
											)}

											{/* Title overlay on hover */}
											<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
												<p className="text-white text-sm font-medium px-3 text-center">
													{post.title || "Untitled Post"}
												</p>
											</div>
										</div>
									</button>
								))}
							</div>
						</div>
					) : (
						// No posts fallback
						<div className="mt-10 w-full text-center border border-purple-600 border-dashed rounded-2xl p-8 bg-gray-900/70 shadow-md hover:shadow-purple-500/30 transition-all duration-500 animate-fade-in">
							<p className="text-purple-400 text-lg font-semibold tracking-wide mb-2">
								No Posts Yet 📭
							</p>
							<p className="text-gray-400 text-sm">
								This user hasn't uploaded any posts yet. Stay tuned for updates!
							</p>
						</div>
					)}


					{/* Animation definitions */}
					<style>{`
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
			@keyframes fadeIn {
			  from { opacity: 0; transform: translateY(10px); }
			  to { opacity: 1; transform: translateY(0); }
			}
			.animate-fade-in {
				animation: fadeIn 1s ease-out forwards;
			}
            }
          `}</style>
				</div>
			) : (
				<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
					<div className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-md p-6 text-center transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-700/40">
						<p className="text-purple-400 text-xl font-semibold tracking-wide">
							User not found
						</p>
						<Link
							to="/"
							className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-5 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-purple-500"
						>
							Back to Home
						</Link>
					</div>
				</div>
			)}
		</>
	)
}
