import {RolesType} from "@/types/types";
import {create} from "zustand";

type RolesStore = {
	roles: RolesType[];
	createRole: (data: RolesType) => void;
	updateRole: (data: RolesType) => void;
	deleteRole: (role: string) => void;
};

export const useRolesStore = create<RolesStore>((set) => ({
	roles: [],
	createRole: (data) => {
		set((state) => ({
			roles: [...state.roles, data],
		}));
	},
	updateRole: (data) => {
		set((state) => ({
			roles: state.roles.map((item) => (item.role === data.role ? data : item)),
		}));
	},
	deleteRole: (role) => {
		set((state) => ({
			roles: state.roles.filter((item) => item.role === role),
		}));
	},
}));
