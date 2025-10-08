import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IResponse, IUser } from "../../types";

export const Layout = () => {
	const [account,setAccount] = useState<IUser | null>(null)
	const [requests,setRequests] = useState<IUser[]>()
	const navigate = useNavigate()
	useEffect(() => {
		Axios.get<IResponse>("/verify")
			.then(response => {
				setAccount(response.data.payload as IUser)
			})
			.catch(() => {
				navigate("/login")
			})
		Axios
		.get("/requests")
		.then(response => {
			setRequests(response.data.payload)
		})
	},[])
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
			<header className="border-b border-gray-700">
				<nav className="flex items-center justify-between px-6 py-4">
					<h1 className="text-3xl font-bold text-purple-400 neon-flicker">Social network</h1>
					<ul className="flex space-x-6 text-lg">
						<li>
							<NavLink
								to=""
								end
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/search"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Search
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/followers"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Followers
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/posts"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "null"
								}
							>
								Posts
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/following"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Followings
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/requests"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								<p>
									Requests{" "}
									{requests && requests.length > 0 ? (
										<strong className="relative inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 via-purple-400 to-pink-500
      text-white shadow-neon-3d cursor-default
      transform transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95
      animate-scale-pulse"
										>
											{requests.length}
											<span className="absolute inset-0 rounded-full blur-xl opacity-60 bg-purple-500 mix-blend-screen"></span>
										</strong>
									) : null}
								</p>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/profile/settings"
								className={({ isActive }) =>
									isActive
										? "text-purple-400 border-b-2 border-purple-400 pb-1"
										: "hover:text-purple-300 transition"
								}
							>
								Settings
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>

			<main className="p-6">
				<Outlet context={{ account, setAccount}}/>
			</main>
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
				@keyframes scalePulse {
				0%, 100% {
				transform: scale(1);
				filter: drop-shadow(0 0 8px #a78bfa);
				}
				50% {
				transform: scale(1.1);
				filter: drop-shadow(0 0 15px #c084fc);
				}
			}
			.animate-scale-pulse {
				animation: scalePulse 2.5s ease-in-out infinite;
			}
			.shadow-neon-3d {
				text-shadow:
				0 0 5px #c084fc,
				0 0 10px #a78bfa,
				0 5px 15px rgba(124, 58, 237, 0.7);
			}
			`}</style>
		</div>
	);
};

