"use client";

import React, {useRef} from "react";

interface DialogProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export function Dialog({trigger, children}: DialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	return (
		<div>
			{/* Trigger Element */}
			<div
				onClick={() => dialogRef.current?.showModal()}
				className="cursor-pointer inline-block">
				{trigger}
			</div>

			{/* Dialog Element */}
			<dialog
				role="dialog"
				aria-modal="false"
				ref={dialogRef}
				// className={`p-6 bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden ${className}`}
				onClose={() => dialogRef.current?.close()}>
				<div className="overflow-y-auto">{children}</div>

				{/* Close Button */}
				<button
					className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
					onClick={() => dialogRef.current?.close()} // Close the dialog when clicked
				>
					Close
				</button>
			</dialog>
		</div>
	);
}
