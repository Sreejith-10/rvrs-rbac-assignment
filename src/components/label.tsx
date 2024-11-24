"use client";

import {cva} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {forwardRef, LabelHTMLAttributes, ReactNode} from "react";

const labelVariants = cva(
	"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	className?: string;
	children: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({children, className, ...props}, ref) => {
		return (
			<label ref={ref} className={cn(labelVariants(), className)} {...props}>
				{children}
			</label>
		);
	}
);

Label.displayName = "Label";
