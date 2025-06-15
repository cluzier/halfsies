"use server"

import { requireAuth } from "@/lib/auth"
import { createRaffle } from "@/lib/db"

export async function createRaffleAction(formData: FormData) {
  const user = await requireAuth()

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const image_url = (formData.get("image_url") as string) || ""
  const ticket_price = Number.parseFloat(formData.get("ticket_price") as string)
  const draw_datetime = formData.get("draw_datetime") as string

  if (!title || !description || !ticket_price || !draw_datetime) {
    return { error: "All required fields must be filled" }
  }

  if (ticket_price < 1) {
    return { error: "Ticket price must be at least $1.00" }
  }

  const drawDate = new Date(draw_datetime)
  if (drawDate <= new Date()) {
    return { error: "Draw date must be in the future" }
  }

  try {
    const raffle = await createRaffle({
      title,
      description,
      image_url,
      ticket_price,
      draw_datetime,
      creator_user_id: user.id,
    })

    return { success: true, raffleId: raffle.id }
  } catch (error) {
    return { error: "Failed to create raffle. Please try again." }
  }
}
