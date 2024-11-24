"use client";

import {PermissionsType} from "@/types/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table";
import {Button} from "@/components/button";
import {Dropdown} from "@/components/drop-down";
import {PlusCircle, EllipsisVertical} from "lucide-react";
import {useState} from "react";
import {SearchBar} from "@/components/search-bar";

const permissions = [
	{
		permission: "Create",
		description: "Create user",
	},
	{
		permission: "Update",
		description: "update data",
	},
	{
		permission: "View",
		description: "view user",
	},
] satisfies PermissionsType[];

export default function Permissions() {
	const [searchTerm, setSearchTerm] = useState("");

	const filterdPermissions = permissions.filter((item) =>
		item.permission.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-auto space-y-4">
			<h1 className="font-semibold text-3xl">Permission Management</h1>
			<div className="w-full flex items-center justify-between">
				<SearchBar
					placeholder="Search permission"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button>
					<PlusCircle />
					Add Permission
				</Button>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Permission</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filterdPermissions.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{item.permission}</TableCell>
							<TableCell className="flex flex-wrap gap-3">
								{item.description}
							</TableCell>
							<TableCell className="relative">
								<Dropdown
									trigger={<EllipsisVertical className="cursor-pointer" />}>
									<div>Edit</div>
									<div>Delete</div>
								</Dropdown>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
