"use client";

import {ReactNode, useEffect, useMemo, useState} from "react";
import {ToastContext} from "./toast-context";
import {createPortal} from "react-dom";
import Toast from "../components/toast";
import {IToast} from "../types/toast";

interface IToasts extends IToast {
	id: number;
}

export const ToastProvider = ({children}: Readonly<{children: ReactNode}>) => {
	const [toasts, setToasts] = useState<IToasts[]>([]);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

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
			{mounted &&
				createPortal(
					<div
						style={{
							position: "fixed",
							top: 10,
							right: "10%",
							marginBottom: 10,
							zIndex: 9999999,
						}}>
						{toasts.map((t) => (
							<Toast key={t.id} content={t} close={() => close(t.id)} />
						))}
					</div>,
					document.body
				)}
			{children}
		</ToastContext.Provider>
	);
};
