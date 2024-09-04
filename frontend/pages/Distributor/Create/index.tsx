import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useForm, Controller, useFieldArray } from "react-hook-form";

type FormData = {
  concertName: string;
  concertCategories: string[];
  concertDates: { date: Date; time: string }[];
};

const categories = ["1", "2", "3", "4", "5"];

export default function DistributorCreateConcert() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    register,
  } = useForm<FormData>({
    mode: "onChange", // Trigger validation on change
    defaultValues: {
      concertName: "",
      concertCategories: [],
      concertDates: [{ date: new Date(), time: "" }], // Initialize with one empty date-time input
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "concertDates",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // handle the form submission
  };

  return (
    <div className="flex-col items-center justify-between px-4 max-w-screen-xl mx-auto w-full flex-wrap">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Concert Name Field */}
        <div>
          <label>Concert Name</label>
          <Controller
            name="concertName"
            control={control}
            rules={{ required: "Concert name is required" }}
            render={({ field }) => (
              <>
                <Input {...field} placeholder="Enter concert name" />
                {errors.concertName && <span className="text-red-500 text-sm">{errors.concertName.message}</span>}
              </>
            )}
          />
        </div>

        {/* Concert Categories Field */}
        <div>
          <label>Concert Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Controller
                key={category}
                name="concertCategories"
                control={control}
                rules={{
                  validate: (value) => value.length > 0 || "At least one category is required",
                }}
                render={({ field: { value, onChange } }) => (
                  <Button
                    variant={value.includes(category) ? "primary" : "outline"}
                    className={value.includes(category) ? "bg-black text-white" : "bg-white text-black"}
                    onClick={() => {
                      if (value.includes(category)) {
                        onChange(value.filter((c) => c !== category));
                      } else {
                        onChange([...value, category]);
                      }
                    }}
                  >
                    {category}
                  </Button>
                )}
              />
            ))}
          </div>
          {errors.concertCategories && <span className="text-red-500 text-sm">{errors.concertCategories.message}</span>}
        </div>

        {/* Concert Dates Field */}
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <label>Concert Dates</label>
            <Button type="button" onClick={() => append({ date: new Date(), time: "" })}>
              Add Concert Date
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4">
                <Controller
                  name={`concertDates.${index}.date`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      label={`Date ${index + 1}`}
                      id={`datetime-picker-${index}`}
                      onDateChange={(selectedDate) => onChange(selectedDate)}
                      onTimeChange={(selectedTime) => {
                        const currentDate = new Date(value);
                        const [hours, minutes] = selectedTime.split(":");
                        currentDate.setHours(parseInt(hours, 10));
                        currentDate.setMinutes(parseInt(minutes, 10));
                        onChange(currentDate);
                      }}
                      date={value}
                      time={value ? format(value, "HH:mm") : ""}
                    />
                  )}
                />
                <Button variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {errors.concertDates && <span className="text-red-500 text-sm">{errors.concertDates.message}</span>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4" disabled={!isValid}>
          Create Concert
        </Button>
      </form>
    </div>
  );
}
