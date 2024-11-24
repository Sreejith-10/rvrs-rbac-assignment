import {cva} from "class-variance-authority";
import {cn} from "../lib/utils";
import {useTimeout} from "../hooks/useTimeout";
import {CircleAlert, CircleCheck, TriangleAlert, X} from "lucide-react";
import {IToast} from "@/types/toast";

interface Content extends IToast {
	id: number;
}

interface ToastProps {
	content: Content;
	close: () => void;
}

const toastVarients = cva(
	"w-[220px] h-fit px-4 py-4 relative left-[80vw] z-[99999999] flex items-center gap-5 rounded-md",
	{
		variants: {
			variant: {
				success:
					"border border-emerald-500 bg-emerald-200 text-emerald-600 z-50",
				error: "bg-red-200 border border-red-500 text-red-500",
				info: "bg-yellow-300 dark:bg-yellow-500 border border-yellow-500 text-slate-800 dark:text-slate-800",
			},
		},
		defaultVariants: {
			variant: "success",
		},
	}
);

const icons: Record<string, JSX.Element> = {
	success: <CircleCheck />,
	error: <TriangleAlert className="text-red-500" />,
	info: <CircleAlert />,
};

const Toast = ({content, close}: ToastProps) => {
	useTimeout(close, content.duration!);

	return (
		<div className={cn(toastVarients({variant: content.variant}))}>
			<X onClick={close} className="absolute top-10 right-10 cursor-pointer" />
			<div>{icons[content.variant!]}</div>
			<div>
				<h1 className="font-semibold">{content.title}</h1>
				<p>{content.description}</p>
			</div>
		</div>
	);
};

export default Toast;
