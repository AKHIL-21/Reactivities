import { z } from "zod";
import { requiredString } from "../Util/util";

export const registerSchema = z.object({
    displayName: requiredString("Display name"),
    email: requiredString("Email").email({ message: "Enter a valid email address" }),
    password: requiredString("Password").min(6, { message: "Password must be at least 6 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
