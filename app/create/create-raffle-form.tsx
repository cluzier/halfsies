"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createRaffleAction } from "./actions"

export function CreateRaffleForm() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    const result = await createRaffleAction(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else if (result.raffleId) {
      router.push(`/raffle/${result.raffleId}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Raffle Details</CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Raffle Title *</Label>
            <Input id="title" name="title" placeholder="e.g., Help Local Animal Shelter" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell people about your cause and why they should participate..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input id="image_url" name="image_url" type="url" placeholder="https://example.com/image.jpg" />
            <p className="text-sm text-muted-foreground">Add an image to make your raffle more appealing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticket_price">Ticket Price (USD) *</Label>
              <Input
                id="ticket_price"
                name="ticket_price"
                type="number"
                min="1"
                step="0.01"
                placeholder="5.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="draw_datetime">Draw Date & Time *</Label>
              <Input id="draw_datetime" name="draw_datetime" type="datetime-local" required />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">How 50:50 Raffles Work</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Participants buy tickets to enter your raffle</li>
              <li>• 50% of the total prize pool goes to the winner</li>
              <li>• 50% goes to support your cause</li>
              <li>• Winner is randomly selected at the draw time</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Raffle..." : "Create Raffle"}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
