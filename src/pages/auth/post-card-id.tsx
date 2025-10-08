import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Axios } from "../../lib/api"
import type { IComment, IPosts, IUser } from "../../types"
import { Image } from "../../lib/helpers/image"
import { useForm, type SubmitHandler } from "react-hook-form"
export const PostCard = () => {
	const {id,userid} = useParams()
	const [post,setPost] = useState<IPosts | undefined>()
	const [user,setUser] = useState<IUser>()
	const {register,handleSubmit,formState:{errors}} = useForm()
	const [active,setActive] = useState(false)
	const [likeCount,setLikeCount] = useState(0)
	const navigate = useNavigate()


	//ab787721
	useEffect(() => {
		Axios
		.get("/posts/" + id)
		.then(response => {
			setPost(response.data.payload)
			console.log(response.data.payload)
		})
		Axios
		.get("/account/" + userid)
		.then(response => {
			setUser(response.data.payload)
		})
	},[])
	const handleLike = () => {
		Axios
		.post("/posts/react/" + id)
		.then(response => {})
	}
	const handleCommentAdd:SubmitHandler<IComment> = (data) => {
		Axios
		.post("/posts/comment/" + id,{text: data})
		Axios
		.get("/posts/" + id)
		.then(response => {
			setPost(response.data.payload)
		})
	}
	const handleLikeList = () => {
		console.log(post?.likes)
		setActive(true)
	}
	const handleDeleteComment = (comId:number | undefined) => {
		Axios
		.delete("/posts/comment/" + comId)
		Axios
			.get("/posts/" + id)
			.then(response => {
				setPost(response.data.payload)
			})
	}
	return <>
		<div className="max-w-xl mx-auto mt-10 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 transition-transform duration-300 hover:scale-[1.01] hover:shadow-purple-700/50">
			{/* User Info */}
			<div className="flex items-center gap-3 p-4">
				<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 shadow-inner">
					<Image
						src={user?.picture}
						width={40}
						height={40}
						className="object-cover w-full h-full"
					/>
				</div>

				<div>
					<p className="font-semibold text-sm text-white">{`${user?.name} ${user?.surname}`}</p>
					<p className="text-xs text-gray-400">Yerevan</p>
				</div>
			</div>

			{/* Post Image */}
			{post?.picture && (
				<div className="w-full">
					<Image
						src={post.picture}
						className="w-full object-cover max-h-[600px] rounded-b-md border-t border-gray-700 transition-transform duration-500"
						alt={post?.title || "Post image"}
					/>
				</div>
			)}

			{/* Post Content */}
			<div className="px-4 py-3">
				<p className="font-semibold text-base text-white mb-2">{post?.title}</p>

				<div className="flex items-center gap-4 mt-2">
					<button
					
					onClick={handleLike}
						className="text-pink-500 hover:text-pink-400 transition-all duration-300 transform hover:scale-300 hover:drop-shadow-lg"
						title="Like"
					>
						❤️ {post?.likes?.length}
					</button>
					<button
						onClick={handleLikeList}
						title="Like List"
						className="relative inline-flex items-center justify-center px-6 py-2 rounded-xl border border-pink-500/50 bg-pink-500/10 text-pink-400 font-semibold text-sm tracking-wide shadow-md backdrop-blur-md
             hover:text-white hover:bg-pink-600/90 hover:shadow-pink-500/40 transition-all duration-500 ease-in-out
             active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
             animate-glow"
					>
						<span className="z-10">💖 Like List</span>
						<span
							className="absolute inset-0 bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 opacity-0 rounded-xl
               group-hover:opacity-100 transition-opacity duration-500 blur-sm"
						></span>
					</button>

					
				</div>

			</div>
		</div>
		{active && (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500">
				<div className="relative w-full max-w-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-3xl shadow-2xl p-8 animate-fadeInUp scale-[1.02]">
					{/* Close Button */}
					<button
						onClick={() => setActive(false)}
						className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 text-xl font-bold"
						aria-label="Close"
					>
						×
					</button>

					{/* Title */}
					<h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text animate-fadeIn">
						People who liked this post {post?.likes?.length}
					</h2>
					{/* Like List */}
					<div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-gray-700 pr-2">
						{post?.likes?.map((user, i) => (
							<div
								key={user.id}
								className="flex items-center justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/60 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/50 transition-all duration-500 group animate-slideUp"
								style={{ animationDelay: `${i * 120}ms` }} // staggered animation
							>
								{/* Left Section */}
								<div className="flex items-center gap-5">
									<Image
										src={user.picture}
										alt=''
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
									<span className="relative z-10">Profile</span>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		)}

		{/*This is a comment div */}
		<div className="w-full max-w-xl mx-auto mt-6 p-5 bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 transition-transform transform hover:scale-[1.01] duration-300">
			{/* Comment Form */}
			<div>
				<form onSubmit={handleSubmit((data) => handleCommentAdd(data.text))} className="space-y-4">
					{/* Comment Label */}
					<label htmlFor="commentInput" className="text-sm text-gray-300 font-medium mb-1">
						Comment
					</label>

					{/* Comment Input */}
					<input
						id="commentInput"
						type="text"
						{...register("text", { required: "Please input comment and add" })}
						placeholder="Add a comment..."
						className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
					/>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-purple-700/30"
					>
						Add Comment
					</button>
				</form>

				{/* Comment List */}
				<div className="mt-6 space-y-4 overflow-y-auto max-h-[300px] scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-600">
					{
						post?.comments.map(comm => (
							<div key={comm.id} className="flex gap-3 items-start bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-inner">
								{/* User Avatar */}
								<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 shadow-inner">
									<Image
										src={comm.user.picture}
										width={40}
										height={40}
										className="object-cover w-full h-full"
									/>
								</div>

								{/* Comment Text */}
								<div className="flex flex-col">
									<p className="font-semibold text-white text-sm">{comm.user.name} {comm.user.surname}</p>
									<p className="text-gray-400 text-xs mt-1">{comm.content}</p>
								</div>
								
									<button onClick={() => handleDeleteComment(comm.id)}>Delete</button>
								
							</div>
						))
					}
				</div>
			</div>
		</div>

	</>
}