import { cn } from "@/lib/utils";
//import { isOnLongLeave } from "@/utils/date-utils";
//import { isWeekend } from "date-fns";
import { Table } from "lucide-react";
import { format } from "date-fns";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { TimeSheetTableRowsProps } from "@/types/timesheet";

export default function TimeSheetTableRows({
    days,
    getEntryForDay,
   // workingWeekends,
   // longLeaves,
    highlightedRow,
    //handleTimeChange,
    //handleWeekendWork,
    //setSelectedDay,
    //setTempEntry,
   // setIsDialogOpen,
  }:TimeSheetTableRowsProps) {
    return (
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="p-4">Day</TableHead>
              <TableHead className="p-4">Start Time</TableHead>
              <TableHead className="p-4">Lunch Time</TableHead>
              <TableHead className="p-4">End Time</TableHead>
              <TableHead className="p-4">Total Hours</TableHead>
              <TableHead className="p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {days.map((day:any) => {
              const dayString = format(day, "yyyy-MM-dd");
              const entry = getEntryForDay(day);
              //const isWeekendDay = isWeekend(day);
              //const isWorkingWeekend = workingWeekends[dayString];
             // const onLongLeave = isOnLongLeave(day, longLeaves);
              const isHighlighted = dayString === highlightedRow;
  
              return (
                <TableRow
                  key={day.toISOString()}
                  className={cn(
                    entry.isAbsent && "bg-red-50",
                    isHighlighted && "bg-yellow-100 transition-colors duration-1000"
                  )}
                >
                  <TableCell className="p-4">{format(day, "dd")}</TableCell>
                  <TableCell className="p-4">{format(day, "EEEE")}</TableCell>
                  {/* Render different row content based on conditions */}
                  {/* <TimeSheetTableRowContent
                    dayString={dayString}
                    day={day}
                    entry={entry}
                    isWeekendDay={isWeekendDay}
                    isWorkingWeekend={isWorkingWeekend}
                    onLongLeave={onLongLeave}
                    handleTimeChange={handleTimeChange}
                    handleWeekendWork={handleWeekendWork}
                    setSelectedDay={setSelectedDay}
                    setTempEntry={setTempEntry}
                    setIsDialogOpen={setIsDialogOpen}
                  /> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
  