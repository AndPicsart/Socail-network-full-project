import type { UserListProps } from "../../types";
import { Image } from "../../lib/helpers/image";
import { Link } from "react-router-dom";

export const UserList = ({ user }: UserListProps) => {
	return (
		<div className="group flex items-center space-x-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-gray-700/50 rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-purple-700/40 hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden animate-slide-up">

			{/* Avatar */}
			<Image
				src={user.picture}
				className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-md transition-transform duration-300 group-hover:scale-105"
			/>

			{/* Info */}
			<div className="flex flex-col justify-center text-white">
				<h2 className="text-lg font-semibold transition-colors duration-300 group-hover:text-purple-400">
					{user.name} {user.surname}
				</h2>

				{user.isPrivate === 1 ? (
					<span className="text-xs text-red-400 bg-red-900 bg-opacity-30 rounded-full px-2 py-0.5 mt-1 w-fit animate-pulse">
						Private Account
					</span>
				) : (
					<span className="text-xs text-green-400 bg-green-900 bg-opacity-30 rounded-full px-2 py-0.5 mt-1 w-fit">
						Public Account
					</span>
				)}
			</div>

			{/* Profile Button */}
			<Link
				to={`/profile/${user.id}`}
				className="ml-auto px-4 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-purple-700 hover:scale-[1.05] hover:shadow-purple-500/30 transition-all duration-300"
			>
				Profile
			</Link>

			{/* Hover Glow Layer */}
			<div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-purple-400 blur-2xl transition duration-500 pointer-events-none" />
		</div>
	);
};
