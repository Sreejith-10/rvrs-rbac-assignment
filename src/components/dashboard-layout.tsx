"use client";

import React, {useState} from "react";
import {Menu} from "lucide-react";
import {SideBar} from "./side-bar";

export function DashboardLayout({children}: {children: React.ReactNode}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<div className="flex w-full h-screen bg-gray-100">
			<SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
					<button
						onClick={toggleSidebar}
						className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors">
						<Menu size={24} />
						<span className="sr-only">Toggle Sidebar</span>
					</button>
					<h1 className="text-xl font-semibold text-purple-700">RVRC</h1>
					<div className="flex items-center gap-4">
						<button className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors">
							Upgrade
						</button>
						<div className="w-8 h-8 bg-purple-500 rounded-full"></div>
					</div>
				</header>

				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
