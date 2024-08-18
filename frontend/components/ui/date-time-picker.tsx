import { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const DateTimePicker = ({
  label,
  tooltip,
  required,
  disabled,
  className,
  id,
  onDateChange,
  onTimeChange,
  date,
  time,
}: {
  label: string;
  tooltip?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id: string;
  onDateChange: (date: Date) => void;
  onTimeChange: (time: string) => void;
  date?: Date;
  time?: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [selectedTime, setSelectedTime] = useState<string>(time || "");

  const handleDateChange = (day: Date | undefined) => {
    if (day) {
      setSelectedDate(day);
      onDateChange(day);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Label htmlFor={id} tooltip={tooltip}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            id={id}
            variant="outline"
            className={cn("justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? `${format(selectedDate, "MM/dd/yyyy")} ${selectedTime}` : <span>Pick a date and time</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
          <div className="mt-2">
            <Input type="time" value={selectedTime} onChange={handleTimeChange} className="w-full" />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
