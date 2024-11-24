import * as z from "zod"

export const userSchema = z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email(),
    role:z.string().min(1,"Role is required")
})