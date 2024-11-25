import {RoleType} from "@/types/types";
import {create} from "zustand";

type RolesStore = {
	roles: RoleType[];
	createRole: (data: RoleType) => void;
	updateRole: (data: RoleType) => void;
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
