import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { TimeEntry } from "../types/timesheet"

type TimeEntryDialogProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  selectedDay: string | null
  tempEntry: TimeEntry | null
  handleTempTimeChange: (field: keyof TimeEntry, value: string | boolean) => void
  confirmTimeChange: () => void
}

export function TimeEntryDialog({
  isOpen,
  setIsOpen,
  selectedDay,
  tempEntry,
  handleTempTimeChange,
  confirmTimeChange
}: TimeEntryDialogProps) {
  if (!selectedDay || !tempEntry) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{format(new Date(selectedDay), "EEEE, MMMM d, yyyy")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`absent-${selectedDay}`}
              checked={tempEntry.isAbsent}
              onCheckedChange={(checked) => 
                handleTempTimeChange("isAbsent", checked === true)
              }
            />
            <Label htmlFor={`absent-${selectedDay}`}>Absent on this day</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`publicHoliday-${selectedDay}`}
              checked={tempEntry.isPublicHoliday}
              onCheckedChange={(checked) => 
                handleTempTimeChange("isPublicHoliday", checked === true)
              }
            />
            <Label htmlFor={`publicHoliday-${selectedDay}`}>Public Holiday</Label>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor={`startTime-${selectedDay}`}>Start Time</Label>
            <Input
              id={`startTime-${selectedDay}`}
              type="time"
              value={tempEntry.startTime}
              onChange={(e) => handleTempTimeChange("startTime", e.target.value)}
              disabled={tempEntry.isAbsent || tempEntry.isPublicHoliday}
              className="bg-blue-50 border-blue-200 focus:border-blue-300 focus:ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor={`lunchTime-${selectedDay}`}>Lunch Time</Label>
            <Input
              id={`lunchTime-${selectedDay}`}
              type="time"
              value={tempEntry.lunchTime}
              onChange={(e) => handleTempTimeChange("lunchTime", e.target.value)}
              disabled={tempEntry.isAbsent || tempEntry.isPublicHoliday}
              className="bg-green-50 border-green-200 focus:border-green-300 focus:ring-green-300"
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor={`endTime-${selectedDay}`}>End Time</Label>
            <Input
              id={`endTime-${selectedDay}`}
              type="time"
              value={tempEntry.endTime}
              onChange={(e) => handleTempTimeChange("endTime", e.target.value)}
              disabled={tempEntry.isAbsent || tempEntry.isPublicHoliday}
              className="bg-purple-50 border-purple-200 focus:border-purple-300 focus:ring-purple-300"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={confirmTimeChange}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

