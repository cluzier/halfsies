import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ImageIcon } from "lucide-react"
import type { Raffle } from "@/lib/db"

interface RaffleCardProps {
  raffle: Raffle
  prizePool?: number
}

export function RaffleCard({ raffle, prizePool = 0 }: RaffleCardProps) {
  const drawDate = new Date(raffle.draw_datetime)
  const now = new Date()
  const timeLeft = drawDate.getTime() - now.getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          {raffle.image_url ? (
            <img
              src={raffle.image_url || "/placeholder.svg"}
              alt={raffle.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full ${colorClass} flex items-center justify-center`}>
              <ImageIcon className="h-16 w-16 text-white/80" />
            </div>
          )}
          <Badge className="absolute top-2 right-2 bg-green-600">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">{raffle.title}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{raffle.description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="font-semibold">${prizePool.toFixed(2)}</span>
            <span className="text-muted-foreground">prize pool</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{daysLeft > 0 ? `${daysLeft} days left` : "Ending soon"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/raffle/${raffle.id}`}>Enter Raffle - ${raffle.ticket_price}/ticket</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
