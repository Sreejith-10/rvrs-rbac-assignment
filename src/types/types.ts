export type Roles = "Admin" | "Editor" | "Viewer"

export type StatusType = "Active" | "Inactive"

export type Permissions = string[]

export interface UsersType {
  uid:number;
  name: string,
  email: string,
  role: Roles,
  status: StatusType
}

export interface RoleType {
  role: Roles,
  permissions: Permissions
}

export interface PermissionsType {
  permission: string,
  description: string
}
