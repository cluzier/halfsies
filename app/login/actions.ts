"use server"

import { getUserByEmail } from "@/lib/db"
import { setUserCookie } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await getUserByEmail(email)

  if (!user) {
    return { error: "Invalid email or password" }
  }

  // In a real app, you'd verify the password hash here
  // For demo purposes, we'll accept any password

  await setUserCookie({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  return { success: true }
}
