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
					<div className="w-full flex items-center justify-between">
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
					<Table className="sm:overflow-x-scroll">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Role</TableHead>
								<TableHead>Permissions</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filterdPermissions?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-semibold">
										{item.permission}
									</TableCell>
									<TableCell>{item.description}</TableCell>
									<TableCell className="">
										<Dropdown
											trigger={<EllipsisVertical className="cursor-pointer" />}>
											<div>
												<Link
													href={"/permissions/update/" + item.id}
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
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</>
			)}
		</div>
	);
}
