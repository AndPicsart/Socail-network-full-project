import { useEffect, useState } from "react"
import type { IResponse, IUser } from "../../types"
import { Axios } from "../../lib/api"
import { UserList } from "./search-user-list"
import { useDebounce } from "../../lib/hooks/useDebounce"

export const Search = () => {
	const [text,setText] = useState("")
	const searchText = useDebounce(text,400)
	const [users,setUsers] = useState<IUser[]>([])
	useEffect(() => {
		if(!searchText){
			return setUsers([])
		}
		Axios
		.get<IResponse <IUser[]>>("/search/" + searchText)
		.then(response => {
			setUsers(response.data.payload)
		})
	},[searchText])
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col md:flex-row items-start justify-center px-6 py-12 space-y-8 md:space-y-0 md:space-x-10">
			{/* Left: Search Box */}
			<div className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 transition-transform transform hover:scale-[1.01] duration-300">
				<h1 className="text-3xl font-extrabold text-purple-400 text-center mb-6 drop-shadow-md">
					🔍 Search Friends
				</h1>

				<form className="space-y-4">
					<div className="flex flex-col">
						<label htmlFor="searchInput" className="text-sm text-gray-300 font-medium mb-1">
							Type a friend's name
						</label>
						<input
							id="searchInput"
							type="text"
							placeholder="e.g. John Doe"
							className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
							onChange={(e) => setText(e.target.value)}
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-purple-700/30"
						onClick={(e) => e.preventDefault()} // prevent refresh
					>
						Search
					</button>
				</form>
			</div>

			{/* Right: Results List */}
			<div className="w-full max-w-md max-h-[500px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent animate-fade-in">
				<p className="text-purple-400 font-semibold text-xl text-center mb-4 select-none drop-shadow-md">
					{users.length === 0
						? "No users found"
						: `Found ${users.length} user${users.length !== 1 ? "s" : ""}`}
				</p>

				{users.map((user, index) => (
					<div
						key={user.id}
						className="group bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700/50 rounded-lg p-4 text-white shadow-md hover:shadow-purple-700/40 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:border-purple-600 cursor-pointer relative overflow-hidden animate-slide-up"
						style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
					>
						<UserList user={user} />

						{/* Glow effect on hover */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-purple-500 blur-2xl transition duration-500 pointer-events-none" />
					</div>
				))}
			</div>
		</div>
	)
}
