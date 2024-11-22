import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

type TimeSheetHeaderProps = {
  selectedYear: number
  selectedMonth: string | undefined
  changeYear: (increment: number) => void
  setSelectedMonth: (month: string) => void
}

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
]

export function TimeSheetHeader({ selectedYear, selectedMonth, changeYear, setSelectedMonth }: TimeSheetHeaderProps) {
  const currentMonth = new Date().getMonth(); // 0-indexed month (January is 0)
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle the edge case of January

  return (
    <div className="flex items-center justify-between bg-muted p-4 rounded-lg">
      <h2 className="text-2xl font-bold">Time Sheet</h2>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => changeYear(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold">{selectedYear}</div>
        <Button variant="outline" size="icon" onClick={() => changeYear(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className={cn("w-[180px]", !selectedMonth && "text-muted-foreground")}>
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem
                key={month}
                value={month}
                disabled={index !== currentMonth && index !== previousMonth} // Disable all months except current and previous
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
