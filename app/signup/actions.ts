"use server"

import { createUser, getUserByEmail } from "@/lib/db"
import { setUserCookie } from "@/lib/auth"

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "An account with this email already exists" }
  }

  // Create new user
  const user = await createUser(name, email, password)

  await setUserCookie({
    id: user.id,
    name: user.name,
    email: user.email,
  })

  return { success: true }
}
