"use client";

import {Button} from "@/components/button";
import {Dropdown} from "@/components/drop-down";
import {Pill} from "@/components/pill";
import {SearchBar} from "@/components/search-bar";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/table";
import {RoleType} from "@/types/types";
import {PlusCircle, EllipsisVertical} from "lucide-react";
import {useState} from "react";

const roles = [
	{
		role: "Admin",
		permissions: ["Create", "Read", "Update", "Delete"],
	},
	{
		role: "Viewer",
		permissions: ["Read"],
	},
	{
		role: "Editor",
		permissions: ["Read", "Update"],
	},
] satisfies RoleType[];

export default function Roles() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredRoles = roles.filter((item) =>
		item.role.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-auto space-y-4">
			<h1 className="font-semibold text-3xl">Role Management</h1>
			<div className="w-full flex items-center justify-between">
				<SearchBar
					placeholder="Search roles"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button>
					<PlusCircle />
					Add Role
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Role</TableHead>
						<TableHead>Permissions</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredRoles.length > 0 ? (
						filteredRoles.map((item, index) => (
							<TableRow key={index}>
								<TableCell className="font-semibold">{item.role}</TableCell>
								<TableCell className="flex flex-wrap gap-3">
									{item.permissions.map((per, index) => (
										<Pill variant={"default"} key={index}>
											{per}
										</Pill>
									))}
								</TableCell>
								<TableCell className="relative">
									<Dropdown
										trigger={<EllipsisVertical className="cursor-pointer" />}>
										<div>Edit</div>
										<div>Delete</div>
									</Dropdown>
								</TableCell>
							</TableRow>
						))
					) : (
						<div className="w-full">No items found</div>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
