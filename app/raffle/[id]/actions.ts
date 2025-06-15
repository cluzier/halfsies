"use server"

import { requireAuth } from "@/lib/auth"
import { createEntry } from "@/lib/db"

export async function enterRaffleAction(formData: FormData) {
  const user = await requireAuth()

  const raffleId = Number.parseInt(formData.get("raffleId") as string)
  const ticketCount = Number.parseInt(formData.get("ticketCount") as string)

  if (!raffleId || !ticketCount || ticketCount < 1) {
    return { error: "Invalid raffle or ticket count" }
  }

  // Get raffle to calculate total amount
  const { getRaffleById } = await import("@/lib/db")
  const raffle = await getRaffleById(raffleId)

  if (!raffle) {
    return { error: "Raffle not found" }
  }

  if (raffle.is_drawn) {
    return { error: "This raffle has already been drawn" }
  }

  const drawDate = new Date(raffle.draw_datetime)
  if (drawDate <= new Date()) {
    return { error: "This raffle has ended" }
  }

  const totalAmount = ticketCount * raffle.ticket_price

  try {
    await createEntry({
      user_id: user.id,
      raffle_id: raffleId,
      ticket_count: ticketCount,
      total_amount: totalAmount,
    })

    return { success: true }
  } catch (error) {
    return { error: "Failed to enter raffle. Please try again." }
  }
}
