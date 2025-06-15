import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, DollarSign } from "lucide-react"
import type { Entry } from "@/lib/db"

interface RecentEntriesProps {
  entries: Entry[]
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  const recentEntries = entries
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)

  const totalParticipants = new Set(entries.map((entry) => entry.user_id)).size

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Recent Entries
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {totalParticipants} participant{totalParticipants !== 1 ? "s" : ""} • {entries.length} total entries
        </p>
      </CardHeader>
      <CardContent>
        {recentEntries.length > 0 ? (
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{entry.user_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{entry.user_name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.ticket_count} ticket{entry.ticket_count !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <DollarSign className="h-3 w-3" />
                  {entry.total_amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">No entries yet. Be the first to enter!</p>
        )}
      </CardContent>
    </Card>
  )
}
