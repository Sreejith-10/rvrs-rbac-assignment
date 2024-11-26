import {useState} from "react";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/table";
import {ArrowUpDown} from "lucide-react";

type Column<T> = {
	header: string;
	key: keyof T;
	sortable?: boolean;
};

interface SortableTableProps<T> {
	data: T[];
	columns: Column<T>[];
}

function SortableTable<T>({data, columns}: SortableTableProps<T>) {
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
							onClick={() => col.sortable && handleSort(col.key)}
							className="cursor-pointer">
							<div className="flex items-center gap-1">
								{col.header}
								{col.sortable && (
									<span>
										{sortConfig?.key === col.key ? (
											sortConfig.direction === "asc" ? (
												<ArrowUpDown className="size-4" />
											) : (
												<ArrowUpDown className="size-4" />
											)
										) : (
											<>
												<ArrowUpDown className="size-4" />
											</>
										)}
									</span>
								)}
							</div>
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedAndFilteredData.map((row, index) => (
					<TableRow key={index}>
						{columns.map((col) => (
							<TableCell key={col.key as string}>
								{row[col.key] as string}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default SortableTable;
