"use client";

import React, {useEffect, useRef} from "react";

interface DropdownProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({trigger, children}) => {
	const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container
	const triggerRef = useRef<HTMLDivElement>(null);

	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		const dropdown = event.currentTarget.querySelector(
			"[data-dropdown-content]"
		);
		if (dropdown) {
			const isVisible = dropdown.getAttribute("data-visible") === "true";
			dropdown.setAttribute("data-visible", isVisible ? "false" : "true");
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			const dropdown = dropdownRef.current.querySelector(
				"[data-dropdown-content]"
			);
			if (dropdown) {
				dropdown.setAttribute("data-visible", "false");
				dropdown.classList.add("hidden");
			}
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	console.log(triggerRef.current?.getBoundingClientRect(), "h");

	return (
		<div
			className="inline-block"
			onClick={handleToggle}
			data-dropdown-container
			ref={dropdownRef}>
			<div
				className="cursor-pointer"
				ref={triggerRef}
				tabIndex={0}
				data-dropdown-trigger>
				{trigger}
			</div>
			{/* md:right-36 right-2 */}
			<div
				className={`absolute md:top-[${
					triggerRef?.current?.getBoundingClientRect() &&
					triggerRef?.current?.getBoundingClientRect().top + 20
				}px] md:right-auto right-20 z-10 hidden w-fit px-4 py-2 space-y-2 mt-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 rounded-md shadow-lg cursor-pointer`}
				data-dropdown-content
				data-visible="false">
				{children}
			</div>
		</div>
	);
};
