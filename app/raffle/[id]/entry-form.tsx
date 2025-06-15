"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Minus, Plus, Ticket } from "lucide-react"
import { enterRaffleAction } from "./actions"

interface EntryFormProps {
  raffleId: number
  ticketPrice: number
  isLoggedIn: boolean
}

export function EntryForm({ raffleId, ticketPrice, isLoggedIn }: EntryFormProps) {
  const [ticketCount, setTicketCount] = useState(1)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const totalAmount = ticketCount * ticketPrice

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    setIsLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("raffleId", raffleId.toString())
    formData.append("ticketCount", ticketCount.toString())

    const result = await enterRaffleAction(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      // Refresh the page to show updated entries and prize pool
      router.refresh()
      setTicketCount(1)
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Enter Raffle
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">You need to be logged in to enter this raffle.</p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Number of Tickets</Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  disabled={ticketCount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="text-center"
                />
                <Button type="button" variant="outline" size="icon" onClick={() => setTicketCount(ticketCount + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Total Amount:</span>
                <span className="text-2xl font-bold">${totalAmount.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {ticketCount} ticket{ticketCount !== 1 ? "s" : ""} × ${ticketPrice.toFixed(2)}
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : `Enter Raffle - $${totalAmount.toFixed(2)}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By entering, you agree that 50% goes to the winner and 50% supports the cause.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
