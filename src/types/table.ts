export type Column<T> = {
	header: string;
	key?: keyof T; // Optional for custom render columns
	sortable?: boolean;
	render?: (row: T) => JSX.Element; // For custom column rendering
};