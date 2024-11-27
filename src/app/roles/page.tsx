"use client";

import {Button} from "@/components/button";
import {DataTable} from "@/components/data-table";
import {Dialog, DialogContent, DialogTrigger} from "@/components/dialog";
import {Dropdown} from "@/components/drop-down";
import {Loader} from "@/components/loader";
import {Pill} from "@/components/pill";
import {SearchBar} from "@/components/search-bar";
import {H1, H3, P} from "@/components/typography";
import {useFetch} from "@/hooks/useFetch";
import {useToast} from "@/hooks/useToast";
import {Column} from "@/types/table";
import {RolesType} from "@/types/types";
import {
	PlusCircle,
	EllipsisVertical,
	AlertTriangle,
	Pencil,
	Trash,
} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

export default function Roles() {
	const [searchTerm, setSearchTerm] = useState("");
	const toast = useToast();

	const {data, isLoading, isError, refetch} = useFetch<RolesType[]>(
		"http://localhost:3005/roles"
	);

	const filteredRoles = data?.filter((item) =>
		item.role.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const removeRole = async (id: string) => {
		try {
			const response = await fetch("http://localhost:3005/roles/" + id, {
				method: "DELETE",
			});
			if (response.ok) {
				toast?.add({
					title: "Success",
					description: "Role removed successfully",
					duration: 3000,
				});
			}
			refetch();
		} catch (error) {
			console.log(error);
			toast?.add({
				title: "Error",
				description: "Failed to remove role. Please try again.",
				duration: 3000,
				variant: "error",
			});
		}
	};

	const columns: Column<RolesType>[] = [
		{header: "Role", key: "role", sortable: true},
		{
			header: "Permissions",
			key: "permissions",
			sortable: false,
			render: (row) => (
				<div className="flex flex-wrap gap-3">
					{row.permissions.length > 0 ? (
						row.permissions.map((item, key) => <Pill key={key}>{item}</Pill>)
					) : (
						<P>No Permissions</P>
					)}
				</div>
			),
		},
		{
			header: "Actions",
			render: (row) => (
				<Dropdown trigger={<EllipsisVertical className="cursor-pointer" />}>
					<div>
						<Link
							href={"/roles/update/" + row.id}
							className="flex items-center gap-2">
							<Pencil className="size-4" />
							Edit
						</Link>
					</div>
					<Dialog>
						<DialogTrigger>
							<div className="flex items-center gap-2">
								<Trash className="size-4" />
								Delete
							</div>
						</DialogTrigger>
						<DialogContent>
							<div className="flex flex-col items-center gap-3">
								<H3>Delete this role</H3>
								<Button
									className="bg-destructive hover:bg-red-400"
									onClick={() => removeRole(row.id)}>
									Confirm
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</Dropdown>
			),
		},
	];

	return (
		<div className="w-full h-auto space-y-4">
			<H1 className="font-semibold text-3xl">Role Management</H1>

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
								href={"/roles/create"}
								className="flex gap-3 items-center justify-center text-gray-50">
								<PlusCircle />
								Add Role
							</Link>
						</Button>
					</div>
					<DataTable columns={columns} data={filteredRoles!} />
				</>
			)}
		</div>
	);
}
