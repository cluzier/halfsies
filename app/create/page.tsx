import { requireAuth } from "@/lib/auth"
import { CreateRaffleForm } from "./create-raffle-form"

export default async function CreateRafflePage() {
  await requireAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create a New Raffle</h1>
          <p className="text-muted-foreground mt-2">Set up your 50:50 raffle to raise money for your cause</p>
        </div>

        <CreateRaffleForm />
      </div>
    </div>
  )
}
