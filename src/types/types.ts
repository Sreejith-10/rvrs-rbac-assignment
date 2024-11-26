
export type StatusType = "Active" | "Inactive";


export interface UsersType {
	id: string;
	name: string;
	email: string;
	role: string;
	status: StatusType;
}

export interface RolesType {
	id: string;
	role: string;
	permissions: string[];
}

export interface PermissionsType {
	id: string;
	permission: string;
	description: string;
}
