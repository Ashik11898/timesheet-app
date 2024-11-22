import {TimeSheetHeaderSectionProps } from "../types/timesheet";
import {LongLeaveDialog} from "../components/long-leave-dialog";

export default function TimeSheetHeaderSection({
    isLongLeaveDialogOpen,
    setIsLongLeaveDialogOpen,
    longLeaves,
    tempLongLeave,
    handleLongLeaveChange,
    confirmLongLeave,
  }:TimeSheetHeaderSectionProps) {
    return (
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Time Entries</h3>
          <LongLeaveDialog
            isOpen={isLongLeaveDialogOpen}
            setIsOpen={setIsLongLeaveDialogOpen}
            tempLongLeave={tempLongLeave}
            handleLongLeaveChange={handleLongLeaveChange}
            confirmLongLeave={confirmLongLeave}
          />
        </div>
        <div className="mt-4 mb-2">
          <h4 className="text-lg font-semibold mb-2">Current Long Leave Periods:</h4>
          {longLeaves.length > 0 ? (
            <ul className="list-disc pl-5">
              {longLeaves.map((leave, index) => (
                <li key={index}>
                  {format(new Date(leave.startDate), "MMMM d, yyyy")} to{" "}
                  {format(new Date(leave.endDate), "MMMM d, yyyy")}: {leave.reason}
                </li>
              ))}
            </ul>
          ) : (
            <p>No long leave periods set.</p>
          )}
        </div>
      </div>
    );
  }
  