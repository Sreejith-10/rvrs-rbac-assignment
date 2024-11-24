import {cn} from "@/lib/utils";
import {
	forwardRef,
	HTMLAttributes,
	ThHTMLAttributes,
	TdHTMLAttributes,
} from "react";

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
	({className, ...props}, ref) => (
		<div className="w-full h-fit overflow-auto rounded-md">
			<table
				ref={ref}
				className={cn("w-full h-auto caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	)
);

Table.displayName = "Table";

const TableHeader = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<thead
		ref={ref}
		className={cn("[&_tr]:border-b rounded-2xl", className)}
		{...props}
	/>
));

TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tbody
		ref={ref}
		className={cn("[&_tr:last-child]:border-0 bg-white", className)}
		{...props}
	/>
));

TableBody.displayName = "TableBody";

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
	<tfoot
		ref={ref}
		className={cn(
			"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className
		)}
		{...props}
	/>
));

TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<
	HTMLTableRowElement,
	HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
	<tr
		ref={ref}
		className={cn(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className
		)}
		{...props}
	/>
));

TableRow.displayName = "TableRow";

const TableHead = forwardRef<
	HTMLTableCellElement,
	ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<th
		ref={ref}
		className={cn(
			"h-12 w-20 px-4 font-semibold text-left align-middle text-muted-foreground [&:has([role=checkbox])]:pr-0",
			className
		)}
		{...props}
	/>
));

TableHead.displayName = "TableHead";

const TableCell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
	<td
		ref={ref}
		className={cn("p-4 [&:has([role=checkbox])]:pr-0", className)}
		{...props}
	/>
));

TableCell.displayName = "TableCell";

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
};
