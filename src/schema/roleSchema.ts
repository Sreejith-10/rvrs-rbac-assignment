import * as z from "zod";

export const roleSchema = z.object({
    role:z.string().min(1,"Role is required"),
    permissions:z.array(z.string()).min(1,"Permission is required")
})