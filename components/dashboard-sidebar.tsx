import { Home, Mic, BookTemplate as FileTemplate, CheckSquare, Settings, BarChart3, Users, Plug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", icon: Home, current: true },
  { name: "Meetings", icon: Mic, current: false },
  { name: "Templates", icon: FileTemplate, current: false },
  { name: "Tasks", icon: CheckSquare, current: false },
  { name: "Analytics", icon: BarChart3, current: false },
  { name: "Team", icon: Users, current: false },
  { name: "Integrations", icon: Plug, current: false },
  { name: "Settings", icon: Settings, current: false },
]

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "default" : "ghost"}
            className={cn(
              "w-full justify-start",
              item.current
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
