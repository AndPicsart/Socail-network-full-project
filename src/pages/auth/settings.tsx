import { ImagePicker } from "./InternalSettings/image-picker"
import { PublicOrPrivate } from "./InternalSettings/privateOrPublic"
import { UpdateLogin } from "./InternalSettings/update-login"
import { UpdatePassword } from "./InternalSettings/update-password"

export const Settings = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-4">
			<div className="max-w-5xl mx-auto">
				{/* Page Title */}
				<h1
					className="
						text-4xl font-extrabold text-purple-400 mb-10
						border-b-4 border-purple-600 pb-4 select-none
						neon-flicker animate-fade-in
					"
				>
					Settings
				</h1>

				{/* Two-column layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Update Login */}
					<section
						className="
							bg-gray-900 bg-opacity-70 rounded-3xl shadow-neon-purple border-2 border-purple-600
							p-8 transform transition duration-300 hover:scale-[1.05] hover:shadow-neon-pulse
							cursor-pointer animate-slide-up
						"
					>
						<UpdateLogin />
					</section>

					{/* Update Password */}
					<section
						className="
							bg-gray-900 bg-opacity-70 rounded-3xl shadow-neon-purple border-2 border-purple-600
							p-8 transform transition duration-300 hover:scale-[1.05] hover:shadow-neon-pulse
							cursor-pointer animate-slide-up delay-75
						"
					>
						<UpdatePassword />
					</section>

					{/* Image Picker */}
					<section
						className="
							bg-gray-900 bg-opacity-70 rounded-3xl shadow-neon-purple border-2 border-purple-600
							p-8 transform transition duration-300 hover:scale-[1.05] hover:shadow-neon-pulse
							cursor-pointer animate-slide-up delay-150
						"
					>
						<ImagePicker />
					</section>

					{/* Public or Private */}
					<section
						className="
							bg-gray-900 bg-opacity-70 rounded-3xl shadow-neon-purple border-2 border-purple-600
							p-8 transform transition duration-300 hover:scale-[1.05] hover:shadow-neon-pulse
							cursor-pointer animate-slide-up delay-200
						"
					>
						<PublicOrPrivate />
					</section>
				</div>
			</div>

			{/* Tailwind Custom Animations & Shadows */}
			<style>{`
				@keyframes fadeIn {
					from { opacity: 0; }
					to { opacity: 1; }
				}
				@keyframes slideUp {
					from { opacity: 0; transform: translateY(15px); }
					to { opacity: 1; transform: translateY(0); }
				}
				@keyframes neonPulse {
					0%, 100% {
						box-shadow:
							0 0 6px #7c3aed,
							0 0 12px #a78bfa,
							0 0 20px #c4b5fd;
					}
					50% {
						box-shadow:
							0 0 10px #9d4edd,
							0 0 20px #c084fc,
							0 0 30px #ddd6fe;
					}
				}
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
						opacity: 0.8;
						text-shadow: none;
					}
				}
				.neon-flicker {
					animation: flicker 3s infinite alternate;
				}
				.animate-fade-in {
					animation: fadeIn 1s ease forwards;
				}
				.animate-slide-up {
					animation: slideUp 0.6s ease forwards;
				}
				.animate-slide-up.delay-75 {
					animation-delay: 0.075s;
				}
				.animate-slide-up.delay-150 {
					animation-delay: 0.15s;
				}
				.animate-slide-up.delay-200 {
					animation-delay: 0.2s;
				}
				.shadow-neon-purple {
					box-shadow:
						0 0 10px #7c3aed,
						0 0 25px #a78bfa,
						0 0 40px #c4b5fd;
				}
				.hover\\:shadow-neon-pulse:hover {
					animation: neonPulse 2.5s ease-in-out infinite alternate;
					box-shadow: none !important;
				}
			`}</style>
		</div>
	)
}
