import {X} from "lucide-react";
import React, {useState} from "react";
import ReactDOM from "react-dom";

interface DialogProps {
	children: React.ReactNode[];
}

interface DialogTriggerProps {
	children: React.ReactNode;
	onClick?: () => void;
}

interface DialogContentProps {
	children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({children}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<DialogTrigger onClick={handleOpen}>{children[0]}</DialogTrigger>
			{isOpen &&
				ReactDOM.createPortal(
					<div className="absolute top-0 left-0 w-dvw h-full bg-black/80 z-50 flex items-center justify-center">
						<div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-md shadow-md relative">
							{children[1]}
							<div
								className="absolute top-2 right-2 border border-slate-400 rounded-md cursor-pointer"
								onClick={handleClose}>
								<X className="text-slate-700" />
							</div>
						</div>
					</div>,
					document.body
				)}
		</>
	);
};

const DialogTrigger: React.FC<DialogTriggerProps> = ({children, onClick}) => {
	return <button onClick={onClick}>{children}</button>;
};

const DialogContent: React.FC<DialogContentProps> = ({children}) => {
	return <div>{children}</div>;
};

export {Dialog, DialogTrigger, DialogContent};
