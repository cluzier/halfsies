import { redirect } from "next/navigation"
import { LoginForm } from "./login-form"
import { getUser } from "@/lib/auth"

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your Halfsies account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
