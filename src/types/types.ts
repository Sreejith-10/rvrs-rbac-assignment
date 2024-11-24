export type Roles = "admin" | "user"

export type StatusType = "active" | "inactive"

export enum Permissions {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete"
}

export interface UsersType {
  name: string,
  email: string,
  role: Roles,
  permissions: Permissions,
  status: StatusType
}
