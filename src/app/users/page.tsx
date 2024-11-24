"use client";

import {Button} from "@/components/button";
import {Pill} from "@/components/pill";
import {Dropdown} from "@/components/drop-down";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/table";
import {EllipsisVertical, Pencil, PlusCircle, Trash} from "lucide-react";
import {useState} from "react";
import {SearchBar} from "@/components/search-bar";
import Link from "next/link";
import {useUsersStore} from "@/store/useUsersStore";

export default function Users() {
	const [searchTerm, setSearchTerm] = useState("");
	const users = useUsersStore((state) => state.users);

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-auto space-y-4">
			<h1 className="font-semibold text-3xl">User Management</h1>
			<div className="w-full flex items-center justify-between">
				<SearchBar
					placeholder="Search user"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button>
					<Link
						href={"/users/create"}
						className="flex gap-3 items-center justify-center">
						<PlusCircle />
						Add User
					</Link>
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead className="text-center">Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map((user, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell className="grid place-content-center">
								<Pill variant={user.status}>{user.status}</Pill>
							</TableCell>
							<TableCell className="relative">
								<Dropdown
									trigger={<EllipsisVertical className="cursor-pointer" />}>
									<div className="">
										<Link
											href={"/users/update/" + user.uid}
											className="flex items-center justify-between gap-4">
											<Pencil className="size-4" />
											Edit
										</Link>
									</div>
									<div className="flex items-center gap-2">
										<Trash className="size-4" />
										Delete
									</div>
								</Dropdown>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
