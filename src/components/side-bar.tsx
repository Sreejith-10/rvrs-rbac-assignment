"use client";

import {Key, Menu, Shield, UserPlus, Users} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface SidebarProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

const menuItems = [
	{icon: Shield, label: "Dashboard", href: "/"},
	{icon: Users, label: "Users", href: "/users"},
	{icon: UserPlus, label: "Roles", href: "/roles"},
	{icon: Key, label: "Permissions", href: "/permissions"},
];

export const SideBar = ({isOpen, toggleSidebar}: SidebarProps) => {
	const path = usePathname();

	return (
		<div
			className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-purple-700 to-purple-900 text-white transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
			<div className="flex items-center justify-between h-16 px-4 bg-purple-800">
				<h2 className="text-xl font-bold">RBAC</h2>
				<button
					onClick={toggleSidebar}
					className="lg:hidden text-white hover:text-purple-200 transition-colors">
					<Menu size={24} />
					<span className="sr-only">Toggle Sidebar</span>
				</button>
			</div>
			<nav className="px-4 py-4">
				<ul className="space-y-2">
					{menuItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
									path === item.href
										? "bg-purple-600 text-white"
										: "text-gray-300 hover:bg-purple-600 hover:text-white"
								}`}>
								<item.icon className="h-5 w-5" />
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};
