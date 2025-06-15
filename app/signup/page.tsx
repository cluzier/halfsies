import { redirect } from "next/navigation"
import { SignupForm } from "./signup-form"
import { getUser } from "@/lib/auth"

export default async function SignupPage() {
  const user = await getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Join Halfsies</h1>
          <p className="text-muted-foreground mt-2">Create your account to start or join raffles</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
