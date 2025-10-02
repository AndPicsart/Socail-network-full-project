import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Axios } from "../../lib/api"
import type { IPosts, IUser } from "../../types"
import { Image } from "../../lib/helpers/image"
export const PostCard = () => {
	const {id,userid} = useParams()
	const [post,setPost] = useState<IPosts | undefined>()
	const [user,setUser] = useState<IUser>()
	useEffect(() => {
		Axios
		.get("/posts/" + id)
		.then(response => {
			setPost(response.data.payload)
		})
		Axios
		.get("/account/" + userid)
		.then(response => {
			setUser(response.data.payload)
		})
	},[])
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
						className="text-pink-500 hover:text-pink-400 transition-all duration-300 transform hover:scale-300 hover:drop-shadow-lg"
						title="Like"
					>
						❤️
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
		<div className="max-w-xl mx-auto mt-6 p-5 bg-gray-700 bg-opacity-80 rounded-xl border border-gray-600 shadow-inner text-gray-300 font-medium text-sm">
			This is a div for comment
		</div>
	</>
}