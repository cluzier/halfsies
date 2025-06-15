import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RaffleCard } from "@/components/raffle-card"
import { getRaffles, getTotalPrizePool } from "@/lib/db"
import { Trophy, Users, Gift } from "lucide-react"

export default async function HomePage() {
  const raffles = await getRaffles()

  // Get prize pools for each raffle
  const rafflesWithPools = await Promise.all(
    raffles.map(async (raffle) => ({
      ...raffle,
      prizePool: await getTotalPrizePool(raffle.id),
    })),
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Enter a 50:50 Raffle. Win Big. Support Causes.</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community-driven raffles where half the prize pool goes to the winner and half supports amazing
            causes. Everyone wins!
          </p>
        </div>
      </section>

      {/* Active Raffles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Active Raffles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join these exciting raffles and help support great causes while having a chance to win big!
            </p>
          </div>

          {rafflesWithPools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rafflesWithPools.map((raffle) => (
                <RaffleCard key={raffle.id} raffle={raffle} prizePool={raffle.prizePool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No active raffles at the moment.</p>
              <Button asChild>
                <Link href="/create">Create the First Raffle</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating and participating in 50:50 raffles is simple and rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>1. Create</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Set up your raffle with a cause, ticket price, and draw date. Upload an image and share your story.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>2. Share</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share your raffle with friends, family, and social media. The more participants, the bigger the prize
                  pool!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>3. Draw</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When the draw time arrives, a winner is randomly selected. They get 50% of the pool, and 50% goes to
                  your cause!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start your own 50:50 raffle today and help raise money for causes you care about while giving participants a
            chance to win big.
          </p>
          <Button asChild size="lg">
            <Link href="/create">Start a Raffle</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
