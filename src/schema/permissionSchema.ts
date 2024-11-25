import * as z from "zod"

export const permissionSchema = z.object({
    permission:z.string().min(1,"Permission is required"),
    description:z.string().min(1,"Description is required")
})