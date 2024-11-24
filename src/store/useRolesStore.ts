import {RoleType} from "@/types/types";
import {create} from "zustand";

type RolesStore = {
	roles: RoleType[];
	createRole: (data: RoleType) => void;
	updateRole: (role: string) => void;
	deleteRole: (role: string) => void;
};

export const useRolesStore = create<RolesStore>((set) => ({
	roles: [],
	createRole: (data) => {
		set((state) => ({
			roles: [...state.roles, data],
		}));
	},
	updateRole: (role) => {},
	deleteRole: (role) => {},
}));
