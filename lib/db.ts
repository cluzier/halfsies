// Mock database functions - replace with your actual database implementation
export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: string
}

export interface Raffle {
  id: number
  title: string
  description: string
  image_url: string
  ticket_price: number
  draw_datetime: string
  creator_user_id: number
  created_at: string
  is_drawn: boolean
}

export interface Entry {
  id: number
  user_id: number
  raffle_id: number
  ticket_count: number
  total_amount: number
  created_at: string
  user_name?: string
}

export interface Winner {
  id: number
  raffle_id: number
  user_id: number
  won_amount: number
  drawn_at: string
}

// Mock data - replace with actual database queries
const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", password: "hashed_password", created_at: "2024-01-01" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", password: "hashed_password", created_at: "2024-01-01" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", password: "hashed_password", created_at: "2024-01-01" },
]

const mockRaffles: Raffle[] = [
  {
    id: 1,
    title: "Help Local Animal Shelter",
    description:
      "Support our local animal shelter with this 50:50 raffle. Half goes to the winner, half helps feed and care for rescued animals.",
    image_url: "",
    ticket_price: 5.0,
    draw_datetime: "2024-12-20T18:00:00Z",
    creator_user_id: 1,
    created_at: "2024-12-01",
    is_drawn: false,
  },
  {
    id: 2,
    title: "Community Food Bank Drive",
    description:
      "Join our community food bank fundraiser! Win big while helping families in need during the holiday season.",
    image_url: "",
    ticket_price: 10.0,
    draw_datetime: "2024-12-22T20:00:00Z",
    creator_user_id: 2,
    created_at: "2024-12-01",
    is_drawn: false,
  },
  {
    id: 3,
    title: "Youth Sports Equipment Fund",
    description: "Help us raise money for new sports equipment for local youth teams. Every ticket counts!",
    image_url: "",
    ticket_price: 3.0,
    draw_datetime: "2024-12-25T15:00:00Z",
    creator_user_id: 3,
    created_at: "2024-12-01",
    is_drawn: false,
  },
]

const mockEntries: Entry[] = [
  {
    id: 1,
    user_id: 2,
    raffle_id: 1,
    ticket_count: 2,
    total_amount: 10.0,
    created_at: "2024-12-10",
    user_name: "Jane Smith",
  },
  {
    id: 2,
    user_id: 3,
    raffle_id: 1,
    ticket_count: 1,
    total_amount: 5.0,
    created_at: "2024-12-10",
    user_name: "Mike Johnson",
  },
  {
    id: 3,
    user_id: 1,
    raffle_id: 2,
    ticket_count: 3,
    total_amount: 30.0,
    created_at: "2024-12-10",
    user_name: "John Doe",
  },
  {
    id: 4,
    user_id: 3,
    raffle_id: 2,
    ticket_count: 1,
    total_amount: 10.0,
    created_at: "2024-12-10",
    user_name: "Mike Johnson",
  },
  {
    id: 5,
    user_id: 1,
    raffle_id: 3,
    ticket_count: 5,
    total_amount: 15.0,
    created_at: "2024-12-10",
    user_name: "John Doe",
  },
  {
    id: 6,
    user_id: 2,
    raffle_id: 3,
    ticket_count: 2,
    total_amount: 6.0,
    created_at: "2024-12-10",
    user_name: "Jane Smith",
  },
]

export async function getUserByEmail(email: string): Promise<User | null> {
  return mockUsers.find((user) => user.email === email) || null
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const newUser: User = {
    id: mockUsers.length + 1,
    name,
    email,
    password,
    created_at: new Date().toISOString(),
  }
  mockUsers.push(newUser)
  return newUser
}

export async function getRaffles(): Promise<Raffle[]> {
  return mockRaffles.filter((raffle) => !raffle.is_drawn)
}

export async function getRaffleById(id: number): Promise<Raffle | null> {
  return mockRaffles.find((raffle) => raffle.id === id) || null
}

export async function getRafflesByCreator(userId: number): Promise<Raffle[]> {
  return mockRaffles.filter((raffle) => raffle.creator_user_id === userId)
}

export async function getRafflesByParticipant(userId: number): Promise<Raffle[]> {
  const participantRaffleIds = mockEntries.filter((entry) => entry.user_id === userId).map((entry) => entry.raffle_id)

  return mockRaffles.filter((raffle) => participantRaffleIds.includes(raffle.id))
}

export async function createRaffle(raffle: Omit<Raffle, "id" | "created_at" | "is_drawn">): Promise<Raffle> {
  const newRaffle: Raffle = {
    ...raffle,
    id: mockRaffles.length + 1,
    created_at: new Date().toISOString(),
    is_drawn: false,
  }
  mockRaffles.push(newRaffle)
  return newRaffle
}

export async function getEntriesByRaffle(raffleId: number): Promise<Entry[]> {
  return mockEntries.filter((entry) => entry.raffle_id === raffleId)
}

export async function createEntry(entry: Omit<Entry, "id" | "created_at">): Promise<Entry> {
  const user = mockUsers.find((u) => u.id === entry.user_id)
  const newEntry: Entry = {
    ...entry,
    id: mockEntries.length + 1,
    created_at: new Date().toISOString(),
    user_name: user?.name,
  }
  mockEntries.push(newEntry)
  return newEntry
}

export async function getTotalPrizePool(raffleId: number): Promise<number> {
  const entries = await getEntriesByRaffle(raffleId)
  return entries.reduce((total, entry) => total + entry.total_amount, 0)
}
