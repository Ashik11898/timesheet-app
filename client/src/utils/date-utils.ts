import { addDays, endOfMonth, format, parse, startOfMonth, differenceInMinutes, isSaturday, isSunday, isWithinInterval } from "date-fns"

export const getDaysInMonth = (month: number, year: number) => {
  const date = new Date(year, month, 1)
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = []
  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day)
  }
  return days
}

export const calculateTotalHours = (entry: TimeEntry) => {
  if (entry.isAbsent) return "Absent"
  if (entry.isPublicHoliday) return "Public Holiday"
  if (!entry.startTime || !entry.endTime) return ""
  const start = parse(entry.startTime, "HH:mm", new Date())
  const end = parse(entry.endTime, "HH:mm", new Date())
  const totalMinutes = differenceInMinutes(end, start)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
}

export const isWeekend = (day: Date) => isSaturday(day) || isSunday(day)

export const isOnLongLeave = (day: Date, longLeaves: LongLeave[]) => {
  const dayString = format(day, "yyyy-MM-dd")
  return longLeaves.some(leave => 
    isWithinInterval(new Date(dayString), {
      start: new Date(leave.startDate),
      end: new Date(leave.endDate)
    })
  )
}

