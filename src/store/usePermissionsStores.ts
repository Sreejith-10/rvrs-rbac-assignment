import { PermissionsType } from "@/types/types"
import { create } from "zustand"

type PermissionsStore = {
    permissions:PermissionsType[],
    createPermission:(data:PermissionsType) => void,
    updatePermission:(data:PermissionsType) => void,
    deletePermission:(permission:string) => void
}

export const usePermissionsStore = create<PermissionsStore>((set)=>({
    permissions:[],
    createPermission: (data) => {
		set((state) => ({
			permissions: [...state.permissions, data],
		}));
	},
	updatePermission: (data) => {
		set((state) => ({
			permissions: state.permissions.map((item) => (item.permission === data.permission ? data : item)),
		}));
	},
	deletePermission: (role) => {
		set((state) => ({
			permissions: state.permissions.filter((item) => item.permission === role),
		}));
	},
}))