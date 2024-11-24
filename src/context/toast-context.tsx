import {createContext} from "react";
import { IToast } from "../types/toast";

export const ToastContext = createContext<{
	add: (data:IToast) => void;
} | null>(null);
