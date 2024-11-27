import {cn} from "@/lib/utils";
import {cva, VariantProps} from "class-variance-authority";
import {forwardRef, ReactNode} from "react";

const pillVariants = cva(
	"w-fit px-5 rounded-full border-[1.2px] font-semibold",
	{
		variants: {
			variant: {
				default: "bg-gray-300 dark:bg-gray-800 border-gray-800 border-opacity-50",
				Active: "bg-emerald-500/20 border-emerald-500 text-emerald-600",
				Inactive: "bg-red-500/20 border-red-500 text-red-600",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

interface PillProps extends VariantProps<typeof pillVariants> {
	className?: string;
	children: ReactNode;
}

export const Pill = forwardRef<HTMLDivElement, PillProps>(
	({children, className, variant, ...props}, ref) => {
		return (
			<div
				className={cn(pillVariants({variant, className}))}
				ref={ref}
				{...props}>
				{children}
			</div>
		);
	}
);

Pill.displayName = "Pill";
