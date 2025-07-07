import * as z from "zod";


export const SignupValidation = z.object({
    name: z.string().min(2,{message: "Too Short"}),
    username: z.string().min(2,{message: "Username must be atleast 2 Characters long"}).max(50,{message: "Username must be less than 50 Characters long"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be atleast 8 Characters long" }),
})

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});