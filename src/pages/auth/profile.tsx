import { useNavigate, useOutletContext } from "react-router-dom";
import type { IContext } from "../../types";
import { Axios } from "../../lib/api";


export const Profile = () => {
	const { account } = useOutletContext<IContext>()
	const navigate = useNavigate()
	const handleLogout = () => {
		Axios.post("/logout")
		.then(() => navigate("/login"))
	}
	console.log(account)
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
			<div className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-[0_20px_50px_rgba(128,0,255,0.2)] p-8 w-full max-w-2xl transition-all duration-500 hover:shadow-purple-700/40 hover:scale-[1.01]">

				{/* Profile Header */}
				<div className="flex items-center space-x-6 mb-8">
					<img
						src={account?.picture ? import.meta.env.VITE_BASE + account.picture : import.meta.env.VITE_DEFAULT_PIC}
						alt="Profile"
						className="w-28 h-28 rounded-full border-4 border-purple-600 shadow-xl transition-transform duration-300 hover:scale-110 hover:rotate-1"
					/>
					<div>
						<h2 className="text-3xl font-bold text-white transition-all duration-300 hover:text-purple-400">
							{account?.name} {account?.surname}
						</h2>
						<p className="text-sm text-gray-400">{`${account?.name + account?.surname}@example.com`}</p>
						{account?.isPrivate ? (
							<span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-red-400 bg-red-900 bg-opacity-30 rounded-full animate-pulse">
								Private
							</span>
						) : (
							<span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-green-400 bg-green-900 bg-opacity-30 rounded-full animate-fade-in">
								Public
							</span>
						)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="grid grid-cols-3 gap-4 mb-8">
					<button className="relative group overflow-hidden rounded-lg bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 text-white px-5 py-2 text-sm font-medium transition-all duration-300 hover:from-purple-700 hover:to-purple-600 shadow-md hover:shadow-purple-500/40 hover:scale-105">
						<span className="relative z-10 group-hover:tracking-widest transition-all duration-300">Edit</span>
						<span className="absolute inset-0 w-full h-full bg-purple-500 opacity-0 group-hover:opacity-20 transition duration-300 blur-lg"></span>
					</button>

					<button className="relative group overflow-hidden rounded-lg bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 text-white px-5 py-2 text-sm font-medium transition-all duration-300 hover:from-purple-700 hover:to-purple-600 shadow-md hover:shadow-purple-500/40 hover:scale-105">
						<span className="relative z-10 group-hover:tracking-widest transition-all duration-300">Archive</span>
						<span className="absolute inset-0 w-full h-full bg-purple-500 opacity-0 group-hover:opacity-20 transition duration-300 blur-lg"></span>
					</button>

					<button className="relative group flex items-center justify-center text-lg rounded-lg bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 text-white px-4 py-2 transition-all duration-300 hover:bg-purple-600 shadow-md hover:shadow-purple-500/30 hover:scale-110">
						⚙️
						<span className="absolute inset-0 w-full h-full bg-purple-500 opacity-0 group-hover:opacity-20 transition duration-300 blur-lg"></span>
					</button>
				</div>

				{/* User Info */}
				<div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 text-gray-300 space-y-3 transition-all duration-300 hover:ring-2 hover:ring-purple-700/40 hover:scale-[1.01] hover:shadow-md">
					<p>
						<span className="font-semibold text-gray-100">Email:</span>{" "}
						{`${account?.name + account?.surname}@example.com`}
					</p>
					<p>
						<span className="font-semibold text-gray-100">Joined:</span> January 1, 2023
					</p>
					<p>
						<span className="font-semibold text-gray-100">Bio:</span> Just another React developer trying to make the web a better place.
					</p>
				</div>

				{/* Footer Buttons */}
				<div className="flex justify-between items-center mt-10 gap-6">
					<button className="relative inline-flex items-center justify-center w-full rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-purple-700 hover:scale-105 shadow-lg hover:shadow-purple-600/40 group">
						<span className="z-10">Edit Profile</span>
						<span className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-md"></span>
					</button>

					<button onClick={handleLogout} className="relative inline-flex items-center justify-center w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:scale-105 shadow-lg hover:shadow-red-600/40 group">
						<span className="z-10">Log Out</span>
						<span className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-md"></span>
					</button>
				</div>
			</div>
		</div>

	);
};
