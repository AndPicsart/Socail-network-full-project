import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Axios } from "../../lib/api"
import type { IComment, IPosts, IUser } from "../../types"
import { Image } from "../../lib/helpers/image"
import { useForm, type SubmitHandler } from "react-hook-form"
export const PostCard = () => {
	const {id,userid} = useParams()
	const [post,setPost] = useState<IPosts | undefined>()
	const [user,setUser] = useState<IUser>()
	const {register,handleSubmit,formState:{errors}} = useForm()
	const [comment,setComment] = useState<IComment[]>([])
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
		.then(response => {
			console.log(response.data)
		})
	}
	const handleCommentAdd:SubmitHandler<IComment> = (data) => {
		Axios
		.post("/posts/comment/" + id,{text: data})
		.then(response => {
			console.log(response.data.payload)
			setComment([...comment,response.data.payload])
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
						className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-300 hover:drop-shadow-lg"
						title="Comment"
					>
						💬
					</button>
				</div>

			</div>

			
		</div>
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
						comment.map(comm => (
							<div key={comm.postId} className="flex gap-3 items-start bg-gray-700 p-4 rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-inner">
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
							</div>
						))
					}
				</div>
			</div>
		</div>

	</>
}