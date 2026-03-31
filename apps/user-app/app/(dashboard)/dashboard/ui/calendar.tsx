"use client";

import { useState } from "react";
import { Button } from "./button";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateRangeSelector() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);

  const formatted =
    range?.from && range?.to
      ? `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`
      : "Date Range";

  return (
    <div className="relative inline-block">
      <Button
        onClick={() => {
          setShowCalendar((prev) => !prev);
        }}
        variant="outline"
      >
        <Calendar className="w-4 h-4 mr-2" />
        {formatted}
      </Button>

      {showCalendar && (
        <div className="absolute z-50 mt-2 p-2 bg-white rounded shadow-md border">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
}
