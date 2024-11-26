import {cn} from "@/lib/utils";
import {ReactNode} from "react";

export const H1 = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<h1
			className={
				(cn(className),
				"scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl")
			}>
			{children}
		</h1>
	);
};

export const H2 = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<h1
			className={
				(cn(className),
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0")
			}>
			{children}
		</h1>
	);
};

export const H3 = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className
			)}>
			{children}
		</h1>
	);
};

export const H4 = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<h1
			className={
				(cn(className), "scroll-m-20 text-xl font-semibold tracking-tight")
			}>
			{children}
		</h1>
	);
};

export const P = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<p className={(cn(className), "leading-7 [&:not(:first-child)]:mt-6")}>
			{children}
		</p>
	);
};
