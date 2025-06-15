import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: number
  name: string
  email: string
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }
  return user
}

export async function setUserCookie(user: User) {
  const cookieStore = await cookies()
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function clearUserCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("user")
}
