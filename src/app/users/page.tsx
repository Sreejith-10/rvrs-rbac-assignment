"use client";

import {Button} from "@/components/button";
import {
	AlertTriangle,
	EllipsisVertical,
	Pencil,
	PlusCircle,
	Trash,
} from "lucide-react";
import {useState} from "react";
import {SearchBar} from "@/components/search-bar";
import Link from "next/link";
import {useFetch} from "@/hooks/useFetch";
import {UsersType} from "@/types/types";
import {Loader} from "@/components/loader";
import {H1, H3} from "@/components/typography";
import {Dropdown} from "@/components/drop-down";
import {Column} from "@/types/table";
import {DataTable} from "@/components/data-table";

const columns: Column<UsersType>[] = [
	{header: "Name", key: "name", sortable: true},
	{header: "Email", key: "email", sortable: true},
	{header: "Role", key: "role", sortable: true},
	{header: "Status", key: "status", sortable: true},
	{
		header: "Actions",
		render: (row) => (
			<Dropdown trigger={<EllipsisVertical className="cursor-pointer" />}>
				<div>
					<Link
						href={"/users/update/" + row.id}
						className="flex items-center gap-2">
						<Pencil className="size-4" />
						Edit
					</Link>
				</div>
				<div className="flex items-center gap-2">
					<Trash className="size-4" />
					Delete
				</div>
			</Dropdown>
		),
	},
];

export default function Users() {
	const [searchTerm, setSearchTerm] = useState("");

	const {data, isLoading, isError, refetch} = useFetch<UsersType[]>(
		"http://localhost:3005/users"
	);

	const filteredUsers = data?.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.role.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-auto space-y-4">
			<H1>User Management</H1>
			{isLoading ? (
				<div className="w-full flex items-center justify-center pt-10">
					<Loader />
				</div>
			) : isError ? (
				<div className="w-full flex items-center flex-col space-y-2 pt-10">
					<AlertTriangle className="size-10 text-red-500" />
					<H3 className="text-red-500">Something went wrong</H3>
					<Button onClick={refetch}>Try again</Button>
				</div>
			) : (
				<>
					<div className="w-full flex items-center justify-between gap-5">
						<SearchBar
							placeholder="Search user"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button className="bg-purple-500 hover:bg-purple-400">
							<Link
								href={"/users/create"}
								className="flex gap-3 items-center justify-center">
								<PlusCircle />
								Add User
							</Link>
						</Button>
					</div>
					<DataTable columns={columns} data={filteredUsers!} />
				</>
			)}
		</div>
	);
}
