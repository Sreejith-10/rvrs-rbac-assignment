"use client";

import {Key, Shield, UserPlus, Users} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export const SideBar = () => {
	const path = usePathname();

	return (
		<div className="w-[25%] h-full bg-white shadow-md">
			<nav className="w-full h-full flex flex-col gap-2 p-5 rounded-md">
				<h1 className="font-semibold text-4xl mb-5">RBAC Dashboard</h1>
				<div
					className={`${
						path === "/" && "bg-slate-100"
					} w-full h-fit p-3 rounded-md flex gap-3 font-semibold`}>
					<Shield />
					<Link href={"/"}>Dashboard</Link>
				</div>
				<div
					className={`${
						path === "/users" && "bg-slate-100"
					} w-full h-fit p-3 rounded-md flex gap-3 font-semibold`}>
					<Users />
					<Link href={"/users"}>Users</Link>
				</div>
				<div
					className={`${
						path === "/roles" && "bg-slate-100"
					} w-full h-fit p-3 rounded-md flex gap-3 font-semibold`}>
					<UserPlus />
					<Link href={"/roles"}>Roles</Link>
				</div>
				<div
					className={`${
						path === "/permissions" && "bg-slate-100"
					} w-full h-fit p-3 rounded-md flex gap-3 font-semibold`}>
					<Key />
					<Link href={"/permissions"}>Permissions</Link>
				</div>
			</nav>
		</div>
	);
};
