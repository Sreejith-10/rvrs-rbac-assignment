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
import {Dialog} from "@/components/dialog";
import DataTable from "@/components/data-table";

const columns = [
	{header: "Name", key: "name", sortable: true},
	{header: "Email", key: "email", sortable: true},
	{header: "Role", key: "role", sortable: true},
	{header: "Status", key: "status", sortable: true},
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
					{/* <Table className="sm:overflow-x-scroll">
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
							{filteredUsers?.map((user, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell className="grid place-content-center">
										<Pill variant={user.status}>{user.status}</Pill>
									</TableCell>
									<TableCell className="">
										<Dropdown
											trigger={<EllipsisVertical className="cursor-pointer" />}>
											<div className="">
												<Link
													href={"/users/update/" + user.id}
													className="flex items-center gap-2">
													<Pencil className="size-4" />
													Edit
												</Link>
											</div>
											<Dialog
												trigger={
													<button className="bg-blue-500 text-white px-4 py-2 rounded">
														Open Dialog
													</button>
												}
												className="backdrop:bg-gray-800/50">
												<h2 className="text-xl font-bold mb-4">
													Hello from Dialog
												</h2>
												<p className="mb-4">
													This is a reusable dialog component.
												</p>
												<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
													Confirm
												</button>
											</Dialog>
										</Dropdown>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table> */}
				</>
			)}
		</div>
	);
}
