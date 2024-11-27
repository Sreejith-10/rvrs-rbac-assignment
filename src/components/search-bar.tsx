import {cn} from "@/lib/utils";
import {cva, VariantProps} from "class-variance-authority";
import {Search} from "lucide-react";
import {forwardRef, InputHTMLAttributes} from "react";
import {Input} from "./input";

const searchbarVariants = cva(
	"absolute left-2 top-1/2 h-4 w-4  -translate-y-1/2 text-muted-foreground"
);

interface SearchBarProps
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof searchbarVariants> {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
	({className, ...props}, ref) => {
		return (
			<div className="relative w-full max-w-sm">
				<Search className={cn(searchbarVariants({className}))} />
				<Input type="text" className="pl-8 w-full dark:bg-gray-900" ref={ref} {...props} />
			</div>
		);
	}
);

SearchBar.displayName = "SearchBar";
