import { Header } from "@/components/Header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { DateTimeInput } from "@/components/ui/date-time-input";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Input } from "@/components/ui/input";
import { createCollection } from "@/entry-functions/create_collection";
import { aptosClient } from "@/utils/aptosClient";
import { uploadCollectionData } from "@/utils/assetsUploader";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

type FormData = {
  concertName: string;
  concertDescription: string;
  concertCategories: string[];
  concertDates: { date: Date; time: string }[];
};

const categories = ["1", "2", "3", "4", "5"];

export default function DistributorCreateConcert() {
  const { account, signAndSubmitTransaction } = useWallet();
  const wallet = useWallet();

  const [publicMintStartDate, setPublicMintStartDate] = useState<Date>();
  const [publicMintEndDate, setPublicMintEndDate] = useState<Date>();
  const [files, setFiles] = useState<FileList | null>(null);

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

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // handle the form submission
    // for loop to loop through each concert date, then for each date loop through each category
    for (const concertDate of data.concertDates) {
      for (const category of data.concertCategories) {

        const { projectUri } = await uploadCollectionData(wallet, files);

        const response = await signAndSubmitTransaction(
          createCollection({
            collectionName: data.concertName + " " + concertDate.date + " " + category,
            collectionDescription: data.concertDescription,
            projectUri: projectUri,
            maxSupply: 100,
            royaltyPercentage: 90,
            preMintAmount: 7,
            allowList: undefined,
            allowListStartDate: undefined,
            allowListEndDate: undefined,
            allowListLimitPerAccount: undefined,
            allowListFeePerNFT: undefined,
            publicMintStartDate,
            publicMintEndDate,
            publicMintLimitPerAccount: 10,
            publicMintFeePerNFT: 1,
          }),
        );

        // Wait for the transaction to be commited to chain
        const committedTransactionResponse = await aptosClient().waitForTransaction({
          transactionHash: response.hash,
        });

        console.log("Transaction committed", committedTransactionResponse);
      }
    }
  };

  return (
    <div className="flex-col items-center justify-between px-4 max-w-screen-xl mx-auto w-full flex-wrap">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardDescription>Upload images of the concert and ticket, along with the metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-between">
              <Input
                // className="hidden"
                ref={inputRef}
                id="upload1"
                disabled={!account}
                webkitdirectory="true"
                multiple
                type="file"
                placeholder="Upload Assets"
                onChange={(event) => {
                  setFiles(event.currentTarget.files);
                }}
              />

              {!!files?.length && (
                <div>
                  {files.length} files selected{" "}
                  <Button
                    variant="link"
                    className="text-destructive"
                    onClick={() => {
                      setFiles(null);
                      inputRef.current!.value = "";
                    }}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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
        <div>
          <label>Concert Description</label>
          <Controller
            name="concertDescription"
            control={control}
            rules={{ required: "Concert name is required" }}
            render={({ field }) => (
              <>
                <Input {...field} placeholder="Enter concert description" />
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
                    type="button"
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

        <div>
          <label>Concert Minting Dates</label>
          <div className="flex item-center gap-4 mt-4">
            <DateTimeInput
              id="mint-start"
              label="Ticket Sales Start Date"
              tooltip="When sales becomes active"
              date={publicMintStartDate}
              onDateChange={setPublicMintStartDate}
              // time={publicMintStartTime}
              // onTimeChange={onPublicMintStartTime}
              className="basis-1/2"
            />

            <DateTimeInput
              id="mint-end"
              label="Ticket Sales End Date"
              tooltip="When sales finishes"
              // disabled={isUploading || !account}
              date={publicMintEndDate}
              onDateChange={setPublicMintEndDate}
              // time={publicMintEndTime}
              // onTimeChange={onPublicMintEndTime}
              className="basis-1/2"
            />
          </div>
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

        <Button type="submit" className="mt-4" disabled={!isValid}>
          Create Concert
        </Button>
      </form>
    </div>
  );
}
