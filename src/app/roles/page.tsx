"use client";

import {Button} from "@/components/button";
import {Dropdown} from "@/components/drop-down";
import {Loader} from "@/components/loader";
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
import {H1, H3} from "@/components/typography";
import {useFetch} from "@/hooks/useFetch";
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

	const {data, isLoading, isError, refetch} = useFetch<RolesType[]>(
		"http://localhost:3005/roles"
	);

	const filteredRoles = data?.filter((item) =>
		item.role.toLowerCase().includes(searchTerm.toLowerCase())
	);

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
					<div className="w-full flex items-center justify-between">
						<SearchBar
							placeholder="Search user"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Button className="bg-purple-500 hover:bg-purple-400">
							<Link
								href={"/roles/create"}
								className="flex gap-3 items-center justify-center">
								<PlusCircle />
								Add Role
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
							{filteredRoles?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-semibold">{item.role}</TableCell>
									<TableCell className="flex flex-wrap gap-3">
										{item?.permissions?.map((item, index) => (
											<Pill key={index}>{item}</Pill>
										))}
									</TableCell>
									<TableCell className="">
										<Dropdown
											trigger={<EllipsisVertical className="cursor-pointer" />}>
											<div>
												<Link
													href={"/roles/update/" + item.id}
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
