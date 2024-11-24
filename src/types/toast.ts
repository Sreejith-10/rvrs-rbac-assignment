export type ToastVarient = "success" | "error" | "info";

export interface IToast {
		title?: string;
		description?: string;
		variant?: ToastVarient;
		duration?: number;
}