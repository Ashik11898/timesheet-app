import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LongLeave } from "../types/timesheet"

type LongLeaveDialogProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  tempLongLeave: LongLeave
  handleLongLeaveChange: (field: keyof LongLeave, value: string) => void
  confirmLongLeave: () => void
}

export function LongLeaveDialog({
  isOpen,
  setIsOpen,
  tempLongLeave,
  handleLongLeaveChange,
  confirmLongLeave
}: LongLeaveDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Long Leave</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Long Leave</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={tempLongLeave.startDate}
              onChange={(e) => handleLongLeaveChange("startDate", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={tempLongLeave.endDate}
              onChange={(e) => handleLongLeaveChange("endDate", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="reason">Reason</Label>
            <Input
              id="reason"
              type="text"
              value={tempLongLeave.reason}
              onChange={(e) => handleLongLeaveChange("reason", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={confirmLongLeave}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

