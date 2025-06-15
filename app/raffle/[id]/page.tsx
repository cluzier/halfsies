import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { EntryForm } from "./entry-form"
import { RecentEntries } from "./recent-entries"
import { getRaffleById, getEntriesByRaffle, getTotalPrizePool } from "@/lib/db"
import { getUser } from "@/lib/auth"
import { DollarSign, Calendar, User, Trophy, ImageIcon } from "lucide-react"

interface RafflePageProps {
  params: Promise<{ id: string }>
}

export default async function RafflePage({ params }: RafflePageProps) {
  const { id } = await params
  const raffleId = Number.parseInt(id)

  if (isNaN(raffleId)) {
    notFound()
  }

  const [raffle, entries, prizePool, user] = await Promise.all([
    getRaffleById(raffleId),
    getEntriesByRaffle(raffleId),
    getTotalPrizePool(raffleId),
    getUser(),
  ])

  if (!raffle) {
    notFound()
  }

  const drawDate = new Date(raffle.draw_datetime)
  const isActive = !raffle.is_drawn && drawDate > new Date()
  const winnerAmount = prizePool * 0.5
  const causeAmount = prizePool * 0.5

  // Generate a color based on raffle ID for visual variety
  const colors = [
    "bg-gradient-to-br from-blue-400 to-blue-600",
    "bg-gradient-to-br from-green-400 to-green-600",
    "bg-gradient-to-br from-purple-400 to-purple-600",
    "bg-gradient-to-br from-orange-400 to-orange-600",
    "bg-gradient-to-br from-pink-400 to-pink-600",
  ]
  const colorClass = colors[raffle.id % colors.length]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Raffle Header */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Completed"}</Badge>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Ticket Price</p>
                  <p className="text-2xl font-bold">${raffle.ticket_price.toFixed(2)}</p>
                </div>
              </div>
              <CardTitle className="text-3xl">{raffle.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
                {raffle.image_url ? (
                  <img
                    src={raffle.image_url || "/placeholder.svg"}
                    alt={raffle.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${colorClass} flex items-center justify-center`}>
                    <ImageIcon className="h-24 w-24 text-white/80" />
                  </div>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">{raffle.description}</p>
            </CardContent>
          </Card>

          {/* Countdown */}
          {isActive && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CountdownTimer targetDate={raffle.draw_datetime} />
                <p className="text-sm text-muted-foreground mt-4">
                  Draw Date: {drawDate.toLocaleDateString()} at {drawDate.toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Prize Pool */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Prize Pool Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">${prizePool.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Total Pool</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold">${winnerAmount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Winner Gets</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <User className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">${causeAmount.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Goes to Cause</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Entry Form */}
          {isActive && <EntryForm raffleId={raffle.id} ticketPrice={raffle.ticket_price} isLoggedIn={!!user} />}

          {/* Recent Entries */}
          <RecentEntries entries={entries} />
        </div>
      </div>
    </div>
  )
}
