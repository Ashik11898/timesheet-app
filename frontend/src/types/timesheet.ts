export type TimeEntry = {
  startTime: string
  lunchTime: string
  lunchTimeEnd:string
  endTime: string
  isAbsent: boolean
  isPublicHoliday: boolean
}

export type LongLeave = {
  startDate: string
  endDate: string
  reason: string
}

export type LeavePeriod = {
  startDate: string;
  endDate: string;
  reason: string;
}

export type TimeSheetHeaderSectionProps = {
  isLongLeaveDialogOpen: boolean;
  setIsLongLeaveDialogOpen: (open: boolean) => void;
  longLeaves: LeavePeriod[];
  tempLongLeave: LeavePeriod;
  handleLongLeaveChange: (field: keyof LongLeave, value: string) => void;
  confirmLongLeave: () => void;
}

export type TimeSheetTableRowsProps = {
  days: Date[];
  timeEntries: Record<string, TimeEntry>;
  getEntryForDay: (day: Date) => TimeEntry;
  workingWeekends: Record<string, boolean>;
  longLeaves: LeavePeriod[] |[];
  highlightedRow: string;
  handleTimeChange: (day: string, field: string, value: string) => void;
  confirmTimeChange: () => void;
  handleWeekendWork: (day: string, isWorking: boolean) => void;
  setIsDialogOpen: (open: boolean) => void;
  setSelectedDay: (day: string) => void;
  setTempEntry: (entry: TimeEntry | null) => void;
}

export type TransferListType = {
  date: string;
  date_Label: string;
  pickup_Point: string;
  destination_Point: string;
  Points_Label: [string,string,string, string]
  pickup_Point_details: string;
  destination_Point_details: string;
};


