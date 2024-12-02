"use client";
import { useEffect } from "react";
import { useTimeSheet } from "../hooks/useTimeSheet"
import { TimeSheetHeader } from "../components/timeSheet-ui/timesheet-header";
import { DefaultTimes } from "../components/timeSheet-ui/default-times";
import { LongLeaveDialog } from "../components/timeSheet-ui/long-leave-dialog";
import { TimeEntryDialog } from "../components/timeSheet-ui/time-entry-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow,TableFooter } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { calculateTotalHours, isWeekend, isOnLongLeave } from "../utils/date-utils";
import { TimeEntry } from "../types/timesheet";

export default function TimeSheetTable() {
  const currentYear = new Date().getFullYear();

  const {
    selectedMonth,
    setSelectedMonth,
    attendance,
    setAttendance,
    selectedYear,
    changeYear,
    days,
    timeEntries,
    handleTimeChange,
    confirmTimeChange,
    workingWeekends,
    handleWeekendWork,
    longLeaves,
    isLongLeaveDialogOpen,
    setIsLongLeaveDialogOpen,
    tempLongLeave,
    handleLongLeaveChange,
    confirmLongLeave,
    defaultStartTime,
    setDefaultStartTime,
    defaultLunchTime,
    setDefaultLunchTime,
    defaultEndLunchTime,
    setdefaultEndLunchTime,
    defaultEndTime,
    setDefaultEndTime,
    highlightedRow,
    tableRef,
    isDialogOpen,
    setIsDialogOpen,
    selectedDay,
    setSelectedDay,
    tempEntry,
    setTempEntry,
    getEntryForDay,
    exportTableToPDF
  } = useTimeSheet(currentYear);


  const handleTempTimeChange = (field: keyof TimeEntry, value: string | boolean) => {
    setTempEntry(prev => prev ? { ...prev, [field]: value } : null)
  }

  useEffect(() => {

    const rows = days.map((day) => {
      const dayString = format(day, "yyyy-MM-dd");
      const entry = getEntryForDay(day);
      const isWeekendDay = isWeekend(day);
      const isWorkingWeekend = workingWeekends[dayString];
      const onLongLeave = isOnLongLeave(day, longLeaves);
     // const isHighlighted = dayString === highlightedRow;

      if (onLongLeave || entry.isPublicHoliday) {
        return [
          format(day, "dd"),
          format(day, "EEEE"),
          '—', '—','—', '—', // Placeholder for empty cells
          onLongLeave ? 'On Long Leave' : 'Public Holiday',
        ];
      } else if (isWeekendDay && !isWorkingWeekend) {
        return [
          format(day, "dd"),
          // format(day, "EEEE"),
          '—', '—','—', '—','—', '—', // Placeholder for empty cells
          
        ];
      } else {
        return [
          format(day, "dd"),
          // format(day, "EEEE"),
          entry.startTime || '',
          entry.lunchTime || '',
          entry.lunchTimeEnd || '',
          entry.endTime || '',
          calculateTotalHours(entry),
          'Edit', // Placeholder for actions
        ];
      }
    });


     // Initialize counters
     let presentDays = 0;
     let absentDays = 0;
     let holidays = 0;
     let totalHours = 0;

     // Loop through the data to categorize days
     rows.forEach(row => {
       const status = row[5]; 
      
       // The 6th item (index 5)
       if (status === "Absent") {
         absentDays++;
       } else if (status === "—") {
         holidays++;
       } else {
        
        totalHours+=Number(status[0])
         presentDays++;
       }
     });

     console.log("totalHours",totalHours);

     setAttendance((prevstate) => ({
      ...prevstate, // Spread the previous state correctly
      daysPresent: presentDays,
      daysAbsent: absentDays,
      totalHours: totalHours,
    }));
    
     console.log("presentDays",presentDays,"absentDays",absentDays);
  },[timeEntries,selectedMonth])



  return (
    <div className="space-y-3 p-3 w-[1200px] mx-auto">
   
      <TimeSheetHeader 
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        changeYear={changeYear}
        setSelectedMonth={setSelectedMonth}
      />
      <DefaultTimes 
        defaultStartTime={defaultStartTime}
        defaultLunchTime={defaultLunchTime}
        defaultEndLunchTime={defaultEndLunchTime}
        defaultEndTime={defaultEndTime}
        setDefaultStartTime={setDefaultStartTime}
        setDefaultLunchTime={setDefaultLunchTime}
        setdefaultEndLunchTime={setdefaultEndLunchTime}
        setDefaultEndTime={setDefaultEndTime}
      />
      {selectedMonth && (
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Time Entries</h3>
            <LongLeaveDialog 
              isOpen={isLongLeaveDialogOpen}
              setIsOpen={setIsLongLeaveDialogOpen}
              tempLongLeave={tempLongLeave}
              handleLongLeaveChange={handleLongLeaveChange}
              confirmLongLeave={confirmLongLeave}
            />
            {/* Export to PDF Button */}
            <Button variant="outline" onClick={exportTableToPDF}>
              Export to PDF
            </Button>
          </div>
          <div className="mt-4 mb-2">
            <h4 className="text-lg font-semibold mb-2">Current Long Leave Periods:</h4>
            {longLeaves.length > 0 ? (
              <ul className="list-disc pl-5">
                {longLeaves.map((leave, index) => (
                  <li key={index}>
                    {format(new Date(leave.startDate), "MMMM d, yyyy")} to {format(new Date(leave.endDate), "MMMM d, yyyy")}: {leave.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No long leave periods set.</p>
            )}
          </div>
          <div className="rounded-lg border overflow-hidden" ref={tableRef}>
            <Table >
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] p-4">Date</TableHead>
                  <TableHead className="p-4">Day</TableHead>
                  <TableHead className="p-4">Start Time</TableHead>
                  <TableHead className="p-4">Lunch Start Time</TableHead>
                  <TableHead className="p-4">Lunch End Time</TableHead>
                  <TableHead className="p-4">End Time</TableHead>
                  <TableHead className="p-4">Total Hours</TableHead>
                  <TableHead className="p-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {days.map((day) => {
                  const dayString = format(day, "yyyy-MM-dd")
                  const entry = getEntryForDay(day)
                  const isWeekendDay = isWeekend(day)
                  const isWorkingWeekend = workingWeekends[dayString]
                  const onLongLeave = isOnLongLeave(day, longLeaves)
                  const isHighlighted = dayString === highlightedRow
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
                      {onLongLeave ? (
                        <TableCell colSpan={5} className="text-center p-4">
                          On Long Leave
                        </TableCell>
                      ) : entry.isPublicHoliday ? (
                        <TableCell colSpan={5} className="text-center p-4">
                          Public Holiday
                        </TableCell>
                      ) : isWeekendDay && !isWorkingWeekend ? (
                        <TableCell colSpan={5} className="text-center p-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Add Weekend Work
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you working on this weekend?</DialogTitle>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => handleWeekendWork(dayString, false)}>
                                  No
                                </Button>
                                <Button onClick={() => handleWeekendWork(dayString, true)}>
                                  Yes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell className="p-4">
                            <Input
                              type="time"
                              value={entry.startTime}
                              onChange={(e) => handleTimeChange(dayString, "startTime", e.target.value)}
                              className="w-28 bg-blue-50 border-blue-200 focus:border-blue-300 focus:ring-blue-300"
                              disabled={entry.isAbsent || entry.isPublicHoliday}
                            />
                          </TableCell>
                          <TableCell className="p-4">
                            <Input
                              type="time"
                              value={entry.lunchTime}
                              onChange={(e) => handleTimeChange(dayString, "lunchTime", e.target.value)}
                              className="w-28 bg-green-50 border-green-200 focus:border-green-300 focus:ring-green-300"
                              disabled={entry.isAbsent || entry.isPublicHoliday}
                            />
                          </TableCell>

                          <TableCell className="p-4">
                            <Input
                              type="time"
                              value={entry.lunchTimeEnd}
                              onChange={(e) => handleTimeChange(dayString, "lunchTimeEnd", e.target.value)}
                              className="w-28 bg-green-50 border-green-200 focus:border-green-300 focus:ring-green-300"
                              disabled={entry.isAbsent || entry.isPublicHoliday}
                            />
                          </TableCell>
                          <TableCell className="p-4">
                            <Input
                              type="time"
                              value={entry.endTime}
                              onChange={(e) => handleTimeChange(dayString, "endTime", e.target.value)}
                              className="w-28 bg-purple-50 border-purple-200 focus:border-purple-300 focus:ring-purple-300"
                              disabled={entry.isAbsent || entry.isPublicHoliday}
                            />
                          </TableCell>
                          <TableCell className="p-4 bg-gray-50">{calculateTotalHours(entry)}</TableCell>
                          <TableCell className="p-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedDay(dayString)
                                setTempEntry(entry)
                                setIsDialogOpen(true)
                              }}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter style={{fontSize: '20px',color: 'blue'}}>
                      
                      
                <TableRow>
                  <TableCell colSpan={3} style={{color:'#355F2E'}}>No of Days Present: {attendance.daysPresent} </TableCell>
                  <TableCell colSpan={3} style={{color:'#FA4032'}}> No of Days Absent: {attendance.daysAbsent}</TableCell>
                  <TableCell  colSpan={3} style={{color: '#FAB12F' }}>Total working Hours:</TableCell>   
                </TableRow>
              </TableFooter>

            </Table>
          </div>
          <TimeEntryDialog 
            isOpen={isDialogOpen}
            setIsOpen={(open) => {
              setIsDialogOpen(open);
              if (!open && tableRef.current) {
                tableRef.current.style.overflow = 'hidden';
                setTimeout(() => {
                  if (tableRef.current) {
                    tableRef.current.style.overflow = 'auto';
                  }
                }, 0);
              }
            }}
            selectedDay={selectedDay}
            tempEntry={tempEntry}
            handleTempTimeChange={handleTempTimeChange}
            confirmTimeChange={confirmTimeChange}
          />
        </>
      )}
    </div>
  )
}
