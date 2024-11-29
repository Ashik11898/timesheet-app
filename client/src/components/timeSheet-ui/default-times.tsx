import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DefaultTimesProps = {
  defaultStartTime: string
  defaultLunchTime: string
  defaultEndLunchTime:string
  defaultEndTime: string
  setDefaultStartTime: (time: string) => void
  setdefaultEndLunchTime: (time: string) => void
  setDefaultLunchTime: (time: string) => void
  setDefaultEndTime: (time: string) => void
}

export function DefaultTimes({
  defaultStartTime,
  defaultLunchTime,
  defaultEndLunchTime,
  defaultEndTime,
  setDefaultStartTime,
  setdefaultEndLunchTime,
  setDefaultLunchTime,
  setDefaultEndTime
}: DefaultTimesProps) {
  return (
    <div className="grid grid-cols-4 gap-6 bg-muted p-4 rounded-lg">
      <div>
        <Label htmlFor="defaultStartTime">Default Start Time</Label>
        <Input
          id="defaultStartTime"
          type="time"
          value={defaultStartTime}
          onChange={(e) => setDefaultStartTime(e.target.value)}
          className="w-full bg-blue-50 border-blue-200 focus:border-blue-300 focus:ring-blue-300"
        />
      </div>
      <div>
        <Label htmlFor="defaultLunchTime">Default Lunch start Time</Label>
        <Input
          id="defaultLunchTime"
          type="time"
          value={defaultLunchTime}
          onChange={(e) => setDefaultLunchTime(e.target.value)}
          className="w-full bg-green-50 border-green-200 focus:border-green-300 focus:ring-green-300"
        />
      </div>

      <div>
        <Label htmlFor="defaultLunchTime">Default Lunch end Time</Label>
        <Input
          id="defaultEndLunchTime"
          type="time"
          value={defaultEndLunchTime}
          onChange={(e) => setdefaultEndLunchTime(e.target.value)}
          className="w-full bg-green-50 border-green-200 focus:border-green-300 focus:ring-green-300"
        />
      </div>
      <div>
        <Label htmlFor="defaultEndTime">Default End Time</Label>
        <Input
          id="defaultEndTime"
          type="time"
          value={defaultEndTime}
          onChange={(e) => setDefaultEndTime(e.target.value)}
          className="w-full bg-purple-50 border-purple-200 focus:border-purple-300 focus:ring-purple-300"
        />
      </div>
    </div>
  )
}

