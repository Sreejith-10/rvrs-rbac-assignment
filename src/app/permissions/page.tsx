"use client";

import {PermissionsType} from "@/types/types";
import {Button} from "@/components/button";
import {Dropdown} from "@/components/drop-down";
import {
	PlusCircle,
	EllipsisVertical,
	AlertTriangle,
	Pencil,
	Trash,
} from "lucide-react";
import {useState} from "react";
import {SearchBar} from "@/components/search-bar";
import Link from "next/link";
import {useFetch} from "@/hooks/useFetch";
import {H1, H3} from "@/components/typography";
import {Loader} from "@/components/loader";
import {Column} from "@/types/table";
import {DataTable} from "@/components/data-table";

const columns: Column<PermissionsType>[] = [
	{header: "Permission", key: "permission", sortable: true},
	{
		header: "Description",
		key: "description",
		sortable: false,
	},
	{
		header: "Actions",
		render: (row) => (
			<Dropdown trigger={<EllipsisVertical className="cursor-pointer" />}>
				<div>
					<Link
						href={"/permissions/update/" + row.id}
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

export default function Permissions() {
	const [searchTerm, setSearchTerm] = useState("");

	const {data, isLoading, isError, refetch} = useFetch<PermissionsType[]>(
		"http://localhost:3005/permissions"
	);

	const filterdPermissions = data?.filter((item) =>
		item.permission.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-auto space-y-4">
			<H1 className="font-semibold text-xl">Permission Management</H1>
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
							placeholder="Search permission"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button className="bg-purple-500 hover:bg-purple-400">
							<Link
								href={"/permissions/create"}
								className="flex gap-3 items-center justify-center">
								<PlusCircle />
								Add Permission
							</Link>
						</Button>
					</div>
					<DataTable columns={columns} data={filterdPermissions!} />
				</>
			)}
		</div>
	);
}
