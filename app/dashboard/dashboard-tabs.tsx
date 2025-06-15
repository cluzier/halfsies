"use client"

import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, DollarSign, Users } from "lucide-react"
import type { Raffle } from "@/lib/db"

interface DashboardTabsProps {
  myRaffles: (Raffle & { prizePool: number })[]
  joinedRaffles: (Raffle & { prizePool: number })[]
}

export function DashboardTabs({ myRaffles, joinedRaffles }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="my-raffles" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="my-raffles">My Raffles ({myRaffles.length})</TabsTrigger>
        <TabsTrigger value="joined-raffles">Joined Raffles ({joinedRaffles.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="my-raffles" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Raffles You Created</h2>
          <Button asChild>
            <Link href="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create New Raffle
            </Link>
          </Button>
        </div>

        {myRaffles.length > 0 ? (
          <div className="grid gap-4">
            {myRaffles.map((raffle) => (
              <RaffleRow key={raffle.id} raffle={raffle} isCreator />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">You haven't created any raffles yet.</p>
              <Button asChild>
                <Link href="/create">Create Your First Raffle</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="joined-raffles" className="space-y-4">
        <h2 className="text-2xl font-semibold">Raffles You Joined</h2>

        {joinedRaffles.length > 0 ? (
          <div className="grid gap-4">
            {joinedRaffles.map((raffle) => (
              <RaffleRow key={raffle.id} raffle={raffle} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">You haven't joined any raffles yet.</p>
              <Button asChild>
                <Link href="/">Browse Active Raffles</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}

function RaffleRow({ raffle, isCreator = false }: { raffle: Raffle & { prizePool: number }; isCreator?: boolean }) {
  const drawDate = new Date(raffle.draw_datetime)
  const isActive = !raffle.is_drawn && drawDate > new Date()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{raffle.title}</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">{raffle.description}</p>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Completed"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Prize Pool</p>
              <p className="font-semibold">${raffle.prizePool.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Draw Date</p>
              <p className="font-semibold">{drawDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Ticket Price</p>
              <p className="font-semibold">${raffle.ticket_price.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/raffle/${raffle.id}`}>View Details</Link>
          </Button>
          {isCreator && isActive && <Button variant="secondary">Share Raffle</Button>}
        </div>
      </CardContent>
    </Card>
  )
}
