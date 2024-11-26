import {ReactNode, useState} from "react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/table";
import {ArrowUpDown} from "lucide-react";
import {Column} from "@/types/table";

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
}

export function DataTable<T>({data, columns}: DataTableProps<T>) {
	const [sortConfig, setSortConfig] = useState<{
		key: keyof T;
		direction: "asc" | "desc";
	} | null>(null);

	const handleSort = (key: keyof T) => {
		setSortConfig((prev) => {
			if (prev?.key === key) {
				return {key, direction: prev.direction === "asc" ? "desc" : "asc"};
			}
			return {key, direction: "asc"};
		});
	};

	const sortedData = () => {
		if (!data || !sortConfig) return data;
		return [...data].sort((a, b) => {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];

			if (aValue < bValue) {
				return sortConfig.direction === "asc" ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortConfig.direction === "asc" ? 1 : -1;
			}
			return 0;
		});
	};

	const sortedAndFilteredData = sortedData();

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map((col, index) => (
						<TableHead
							key={index}
							onClick={() => col.sortable && col.key && handleSort(col.key)}
							className={col.sortable ? "cursor-pointer" : ""}>
							<div className="flex items-center gap-1">
								{col.header}
								{col.sortable && col.key && (
									<span>
										{sortConfig?.key === col.key ? (
											sortConfig.direction === "asc" ? (
												<ArrowUpDown className="size-4" />
											) : (
												<ArrowUpDown className="size-4" />
											)
										) : (
											<ArrowUpDown className="size-4" />
										)}
									</span>
								)}
							</div>
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedAndFilteredData?.length > 0 ? (
					sortedAndFilteredData?.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{columns.map((col, colIndex) => (
								<TableCell key={colIndex}>
									{col.render
										? col.render(row)
										: (row[col.key as keyof T] as ReactNode)}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length}>
							<div className="font-normal p-2">No items found</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
