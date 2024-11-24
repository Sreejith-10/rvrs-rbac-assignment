"use client";

import {ReactNode, useMemo, useState} from "react";
import {ToastContext} from "./toast-context";
import {createPortal} from "react-dom";
import Toast from "../components/toast";
import {IToast} from "../types/toast";

interface IToasts extends IToast {
	id: number;
}

export const ToastProvider = ({children}: Readonly<{children: ReactNode}>) => {
	const [toasts, setToasts] = useState<IToasts[]>([]);

	const add = ({
		title,
		description,
		duration = 2000,
		variant = "success",
	}: IToast) => {
		const uid = new Date().getTime();
		setToasts((prev) => [
			...prev,
			{title, description, duration, variant, id: uid},
		]);
	};

	const close = (id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	const contextValue = useMemo(() => ({add}), []);

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
			{createPortal(
				<div className="fixed top-5 left-5 space-y-2">
					{toasts.map((t) => (
						<Toast key={t.id} content={t} close={() => close(t.id)} />
					))}
				</div>,
				document.body
			)}
		</ToastContext.Provider>
	);
};
