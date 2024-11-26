"use client";

import {cva} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {forwardRef, HTMLAttributes} from "react";

const labelVariants = cva(
	"w-10 h-10 p-10 border-[10px] border-slate-400 border-r-transparent animate-spin rounded-full"
);

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
	({className}, ref) => {
		return <div ref={ref} className={cn(labelVariants(), className)} />;
	}
);

Loader.displayName = "Loader";
