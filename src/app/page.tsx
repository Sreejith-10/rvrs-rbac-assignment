import { Button } from "@/components/button";
import { Pill } from "@/components/pill";
import { Dropdown } from "@/components/drop-down"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/table";
import { Permissions, UsersType } from "@/types/types";
import { EllipsisVertical, PlusCircle } from "lucide-react";

const users = [
  {
    name: "sreejith",
    email: "sreejith@gmail.com",
    role: "admin",
    permissions: Permissions.CREATE,
    status: "active"
  },
  {
    name: "vipin",
    email: "vipin@gmail.com",
    role: "user",
    permissions: Permissions.UPDATE,
    status: "inactive"
  },
  {
    name: "sooraj",
    email: "sooraj@gmail.com",
    role: "admin",
    permissions: Permissions.READ,
    status: "active"
  },

] satisfies UsersType[]

export default function Home() {
  return (
    <div className="w-full h-auto space-y-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-semibold text-3xl">User Management</h1>
        <Button>
          <PlusCircle />
          Add User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-center">
                  <Pill variant={user.status}>{user.status}</Pill>
                </TableCell>
                <TableCell className="relative">
                  <Dropdown
                    trigger={
                      <EllipsisVertical className="cursor-pointer" />
                    }
                  >
                    <div>Edit</div>
                    <div>Delete</div>
                  </Dropdown>
                </TableCell>
              </TableRow>

            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}
