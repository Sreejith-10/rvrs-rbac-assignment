"use client";

import React from "react";

interface DropdownProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({trigger, children}) => {
	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		const dropdown = event.currentTarget.querySelector(
			"[data-dropdown-content]"
		);
		if (dropdown) {
			const isVisible = dropdown.getAttribute("data-visible") === "true";
			dropdown.setAttribute("data-visible", isVisible ? "false" : "true");
		}
	};

	return (
		<div
			className="relative inline-block"
			onClick={handleToggle}
			data-dropdown-container>
			{/* Trigger Element */}
			<div className="cursor-pointer" tabIndex={0} data-dropdown-trigger>
				{trigger}
			</div>

			{/* Dropdown Content */}
			<div
				className="absolute z-10 hidden w-fit px-4 py-2 space-y-2 mt-2 bg-white border border-gray-200 rounded-md shadow-lg cursor-pointer"
				data-dropdown-content
				data-visible="false">
				{children}
			</div>
		</div>
	);
};
