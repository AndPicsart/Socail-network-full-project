import { useEffect, useRef, useState } from "react"
import type { IPosts, IPreviewPost } from "../../types"
import { Axios } from "../../lib/api"

export const Posts = () => {
	const [posts, setPosts] = useState<IPosts[]>([])
	const [error,setError] = useState("")
	const [preview, setPreview] = useState<IPreviewPost | null>(null)
	const [title, setTitle] = useState("")
	let picinput = useRef<HTMLInputElement>(null)
	const handlePreview = () => {
		if (picinput.current?.files?.[0]) {
			const file = picinput.current.files[0]
			const reader = new FileReader()
			reader.onload = () => {
				setPreview({ image: reader.result as string, text: title })
			}
			reader.readAsDataURL(file)
		}
	}
	useEffect(() => {
		Axios
			.get("/posts")
			.then(response => {
				console.log(response.data.payload)
				setPosts(response.data.payload)
			})
	},[])
	const handleUpload = () => {
		console.log(picinput.current?.files)
		if (picinput.current?.files?.[0]) {
			const file = picinput.current.files[0]
			const form = new FormData()
			console.log(form)
			form.append("photo", file)
			form.append("content", title)

			Axios.post("/posts", form)
			.then(response => {
				console.log(response.data.payload)
				setPreview(null)
				setTitle("")
				console.log(posts)
				setPosts([...posts,{...response.data.payload}])
			})
		}
		else{
			setPreview(null)
			setTitle("")
			setError("Error Please input image")
		}
	}
	return (
		<div className="max-w-3xl mx-auto py-10 px-4 text-white">
			<h3 className="text-4xl font-bold mb-10 text-purple-400 text-center">
				Posts
			</h3>

			{/* --- Post Input Section and Image--- */}
			<div className="bg-gray-800 border border-gray-700 p-6 rounded-lg mb-12">
				<h4 className="text-xl font-semibold text-purple-300 mb-4">Create a Post</h4>
				{error && <h2 className="bg-red-600 text-white text-xl font-bold text-center py-4 px-6 rounded-lg shadow-lg border-2 border-red-800 my-6 animate-pulse">{error}</h2>}
				<label className="block mb-2 text-sm text-gray-300">Post Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter title..."
					className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
				<button type="button" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" onClick={() => picinput.current?.click()} > Choose a Picture for Post </button>
				<input type="file" ref={picinput} className="hidden" onChange={handlePreview}/>
			</div>
			{/*---preview---*/}
			{preview && (
				<div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md mb-8">
					{preview.image && (
						<img
							src={preview.image}
							alt="Preview"
							className="w-full h-full object-cover"
						/>
					)}
					<div className="flex gap-4 mt-4">
						<button
							type="button"
							className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
							onClick={handleUpload}
						>
							Upload
						</button>

						<button
							type="button"
							className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
							onClick={() => {
								setPreview(null)
								setTitle("")
								picinput = useRef<HTMLInputElement>(null)
							}}
						>
							Cancel
						</button>
					</div>

				</div>
			)}




			{/* --- Post Display Section --- */}
			<div className="space-y-8">
				{posts?.map((post) => (
					<div
						key={post.id}
						className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-600/60 hover:scale-[1.03] transform-gpu cursor-pointer"
					>
						{post.picture && (
							<img
								src={import.meta.env.VITE_BASE + post.picture}
								alt="Post Image"
								className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
							/>
						)}
						<div className="p-4">
							<p className="text-lg text-gray-100 font-semibold">{post.title}</p>
						</div>
					</div>

				))}
			</div>
		</div>
	)
}
