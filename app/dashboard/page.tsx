import { requireAuth } from "@/lib/auth"
import { getRafflesByCreator, getRafflesByParticipant, getTotalPrizePool } from "@/lib/db"
import { DashboardTabs } from "./dashboard-tabs"

export default async function DashboardPage() {
  const user = await requireAuth()

  const [myRaffles, joinedRaffles] = await Promise.all([getRafflesByCreator(user.id), getRafflesByParticipant(user.id)])

  // Get prize pools for raffles
  const myRafflesWithPools = await Promise.all(
    myRaffles.map(async (raffle) => ({
      ...raffle,
      prizePool: await getTotalPrizePool(raffle.id),
    })),
  )

  const joinedRafflesWithPools = await Promise.all(
    joinedRaffles.map(async (raffle) => ({
      ...raffle,
      prizePool: await getTotalPrizePool(raffle.id),
    })),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">Manage your raffles and track your participation</p>
      </div>

      <DashboardTabs myRaffles={myRafflesWithPools} joinedRaffles={joinedRafflesWithPools} />
    </div>
  )
}
