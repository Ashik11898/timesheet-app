import { useState, useMemo, useRef, useEffect } from "react";
import { format } from "date-fns";
import { TimeEntry, LongLeave } from "../types/timesheet";
import { getDaysInMonth,calculateTotalHours, isWeekend, isOnLongLeave} from "../utils/date-utils";
import { jsPDF } from "jspdf";
import  "jspdf-autotable";


export function useTimeSheet(currentYear: number) {
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(undefined);
  const [attendance,setAttendance]=useState({"daysPresent":0,"daysAbsent":0,"totalHours":0})
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [defaultStartTime, setDefaultStartTime] = useState("09:00");
  const [defaultLunchTime, setDefaultLunchTime] = useState("12:00");
  const [defaultEndLunchTime, setdefaultEndLunchTime] = useState("13:00");
  const [defaultEndTime, setDefaultEndTime] = useState("17:00");
  const [timeEntries, setTimeEntries] = useState<{ [key: string]: TimeEntry }>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [workingWeekends, setWorkingWeekends] = useState<{ [key: string]: boolean }>({});
  const [tempEntry, setTempEntry] = useState<TimeEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLongLeaveDialogOpen, setIsLongLeaveDialogOpen] = useState(false);
  const [longLeaves, setLongLeaves] = useState<LongLeave[]>([]);
  const [tempLongLeave, setTempLongLeave] = useState<LongLeave>({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);

  const tableRef = useRef<HTMLDivElement>(null);

  const days = useMemo(
    () =>
      selectedMonth !== undefined
        ? getDaysInMonth(
            [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].indexOf(selectedMonth),
            selectedYear
          )
        : [],
    [selectedMonth, selectedYear]
  );

  const handleTimeChange = (day: string, field: keyof TimeEntry, value: string | boolean) => {
    setTimeEntries((prev) => ({
      ...prev,
      [day]: {
        ...getEntryForDay(new Date(day)),
        [field]: value,
      },
    }));
  };

  const handleTempTimeChange = (field: keyof TimeEntry, value: string | boolean) => {
    setTempEntry((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const confirmTimeChange = () => {
    if (selectedDay && tempEntry) {
      setTimeEntries((prev) => ({
        ...prev,
        [selectedDay]: tempEntry,
      }));
      setSelectedDay(null);
      setTempEntry(null);
      setIsDialogOpen(false);
      setHighlightedRow(selectedDay);
      setTimeout(() => setHighlightedRow(null), 2000);
    }
  };

  const changeYear = (increment: number) => {
    setSelectedYear((prev) => prev + increment);
  };

  const getEntryForDay = (day: Date) => {
    const dayString = format(day, "yyyy-MM-dd");
    return (
      timeEntries[dayString] || {
        startTime: defaultStartTime,
        lunchTime: defaultLunchTime,
        lunchTimeEnd:defaultEndLunchTime,
        endTime: defaultEndTime,
        isAbsent: false,
        isPublicHoliday: false,
      }
    );
  };

  const handleWeekendWork = (day: string, isWorking: boolean) => {
    setWorkingWeekends((prev) => ({
      ...prev,
      [day]: isWorking,
    }));
    if (isWorking) {
      setTimeEntries((prev) => ({
        ...prev,
        [day]: {
          startTime: defaultStartTime,
          lunchTime: defaultLunchTime,
          lunchTimeEnd:defaultEndLunchTime,
          endTime: defaultEndTime,
          isAbsent: false,
          isPublicHoliday: false,
        },
      }));
    }
  };

  const handleLongLeaveChange = (field: keyof LongLeave, value: string) => {
    setTempLongLeave((prev) => ({ ...prev, [field]: value }));
  };

  const confirmLongLeave = () => {
    if (tempLongLeave.startDate && tempLongLeave.endDate && tempLongLeave.reason) {
      const startDate = new Date(tempLongLeave.startDate);
      const endDate = new Date(tempLongLeave.endDate);
      if (startDate <= endDate) {
        setLongLeaves((prev) => [
          ...prev,
          {
            ...tempLongLeave,
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
          },
        ]);
        setTempLongLeave({ startDate: "", endDate: "", reason: "" });
        setIsLongLeaveDialogOpen(false);
      } else {
        alert("End date must be after or equal to start date.");
      }
    }
  };

  

  const exportTableToPDF = () => {
    const doc = new jsPDF();
    const table = tableRef.current;
  
    // Ensure the table is available
    if (table) {
      // Manually map the rows to be passed to autoTable
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
            '—', '—','—', // Placeholder for empty cells
            onLongLeave ? 'On Long Leave' : 'Public Holiday',
          ];
        } else if (isWeekendDay && !isWorkingWeekend) {
          return [
            format(day, "dd"),
          
            '—', '—','—', '—','—', 
            
          ];
        } else {
          return [
            format(day, "dd"),
            entry.startTime || '',
            entry.lunchTime || '',
            entry.lunchTimeEnd || '',
            entry.endTime || '',
            calculateTotalHours(entry),
            'Edit', // Placeholder for actions
          ];
        }
      });
     
      
      

      // TypeScript does not recognize autoTable on jsPDF by default
      (doc as any).autoTable({
        head: [
          ['Date', 'Start Time', 'Lunch Start', 'Lunch End', 'End Time', 'Total Hours'],
        ],
        body: rows,
        foot:[
          [`Days Present: ${ attendance.daysPresent}`,`Days Absent: ${ attendance.daysAbsent}`,`Total Hours: ${ attendance.totalHours}`,'', '', '' ],
        ],
       
      
        footStyles:{
          fillColor:"#fff",
          textColor: "#000",
          fontSize: 10,
          cellPadding:5,
          halign: "center", // Center alignment
          valign: "middle", // Middle alignment
        }
      });
      
  
      // Save the PDF
      doc.save("timesheet.pdf");
    } else {
      console.error("Table reference is null");
    }
  };



  useEffect(() => {
    if (!isDialogOpen && tableRef.current) {
      tableRef.current.style.overflow = "auto";
    }
  }, [isDialogOpen]);

  return {
    selectedMonth,
    setSelectedMonth,
    attendance,
    setAttendance,
    selectedYear,
    changeYear,
    days,
    timeEntries,
    handleTimeChange,
    handleTempTimeChange,
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
  };
}
