import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"


import { Button } from "@/components/ui/button"
import type { Resolver } from "react-hook-form"
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const SignupForm = () => {

   // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
     <div className="flex min-h-svh flex-col items-center justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
    </Form>
    </div>
    
  )
}

export default SignupForm

function useForm<T>(arg0: { resolver: Resolver<{ username: string }, unknown, { username: string }>; defaultValues: { username: string } }) {
  throw new Error("Function not implemented.")
}
