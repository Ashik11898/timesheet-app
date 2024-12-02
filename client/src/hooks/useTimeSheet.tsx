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
            '_',
            '_', '_','_', // Placeholder for empty cells
            onLongLeave ? 'On Long Leave' : 'Public Holiday',
          ];
        } else if (isWeekendDay && !isWorkingWeekend) {
          return [
            format(day, "dd"),
          
            '_','_','_','_','_', 
            
          ];
        } else {

          let isAbsent = calculateTotalHours(entry)
          return [
            format(day, "dd"),
            (isAbsent !== "Absent" && isAbsent !== "Public Holiday") ? entry.startTime : '_',
            (isAbsent !== "Absent" && isAbsent !== "Public Holiday") ? entry.lunchTime : '_',
            (isAbsent !== "Absent" && isAbsent !== "Public Holiday") ? entry.lunchTimeEnd : '_',
            (isAbsent !== "Absent" && isAbsent !== "Public Holiday") ? entry.endTime : '_',
            calculateTotalHours(entry),
            'Edit', // Placeholder for actions
          ];
        }
      });
     

      (doc as any).autoTable({
        startY: 10, // Start at the top with some padding
        body: [
          ['Name:', 'Mohamed Ashik', 'Role:', 'React js Developer']  // Both Name and Role in a single row
        ],
        styles: {
          halign: 'left', // Left alignment for the name and role
          fontSize: 12,
          cellPadding: 2,
          textColor: "#000",
        }
      });
      
      const columnWidths = [20, 27, 27, 27, 40, 40];

      // TypeScript does not recognize autoTable on jsPDF by default
      (doc as any).autoTable({
        head: [
          ['Date', 'Start Time', 'Lunch Start', 'Lunch End', 'End Time', 'Total Hours'],
        ],
        body: rows,
        foot: [
          ['', '', '', '',`Present Days:  ${attendance.daysPresent}`, `Absent Days: ${attendance.daysAbsent}`],
        ],
        columnStyles: {
          0: { cellWidth: columnWidths[0] }, // Adjust column widths as needed
          1: { cellWidth: columnWidths[1] },
          2: { cellWidth: columnWidths[2] },
          3: { cellWidth: columnWidths[3] },
          4: { cellWidth: columnWidths[4] },
          5: { cellWidth: columnWidths[5]},
        },
        headStyles: {
          textColor: "#fff",
        },
        bodyStyles: {
          fontSize: 11,
          textColor: "#000",
          cellPadding: 1.5,
        },
        footStyles: {
          fillColor: "#FFF",
          textColor: "#986801",
          fontSize: 12,
          cellPadding: { top: 2, right: 0, bottom: 2, left: 0 },
          halign: "center", // Center alignment
          valign: "middle", // Middle alignment
        },
      
        didParseCell: function (data: any) {
          if (data.section === 'body' && data.column.index === 5) {
            const cellValue = data.cell.text?.[0] || '';
            data.cell.styles.fontStyle = "bold";
            if (['Absent', 'On Long Leave', ].includes(cellValue)) {
              data.cell.styles.textColor = "#ff0000"; // Red for specific values
            } 
            else if(['Public Holiday'].includes(cellValue)){data.cell.styles.textColor = "#E85C0D"}
            else {
              data.cell.styles.textColor = "#00712D"; // Blue for other values
              
            }
            
          }
        },

       
        
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
