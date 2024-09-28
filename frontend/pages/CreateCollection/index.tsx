// External packages
import { useEffect, useRef, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link, useNavigate } from "react-router-dom";
// Internal utils
import { aptosClient } from "@/utils/aptosClient";
import { uploadCollectionData } from "@/utils/assetsUploader";
// Internal components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { CREATOR_ADDRESS } from "@/constants";
import { WarningAlert } from "@/components/ui/warning-alert";
import { UploadSpinner } from "@/components/UploadSpinner";
import { LabeledInput } from "@/components/ui/labeled-input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import { ConfirmButton } from "@/components/ui/confirm-button";
// Entry functions
import { createCollection } from "@/entry-functions/create_collection";
// Datetime functions
import { format } from "date-fns";
import { masterAccounts } from "../../constants";
import supabase from "../../main";

function CreateCollection() {
  // Wallet Adapter provider
  const aptosWallet = useWallet();
  const { account, signAndSubmitTransaction } = useWallet();

  // If we are on Production mode, redierct to the public mint page
  const navigate = useNavigate();

  // Collection data entered by the user on UI
  const [collectionName, setCollectionName] = useState<string>("");
  const [concertDetails, setConcertDetails] = useState<string>("");
  const [concertType, setConcertType] = useState<string>("");
  const [showDate, setShowDate] = useState<Date>();
  const [showTime, setShowTime] = useState<string>();
  const [pricing, setPricing] = useState<number>();
  const [maxSupply, setMaxSupply] = useState<number>();
  const royaltyPercentage = 0;
  const preMintAmount = 0;
  const [publicMintStartDate, setPublicMintStartDate] = useState<Date>();
  const [publicMintStartTime, setPublicMintStartTime] = useState<string>();
  const [publicMintEndDate, setPublicMintEndDate] = useState<Date>();
  const [publicMintEndTime, setPublicMintEndTime] = useState<string>();
  const [publicMintLimitPerAccount, setPublicMintLimitPerAccount] = useState<number>(1);
  const [publicMintFeePerNFT, setPublicMintFeePerNFT] = useState<number>();
  const [allowListMintStartDate, setAllowListMintStartDate] = useState<Date>();
  const [allowListMintStartTime, setAllowListMintStartTime] = useState<string>();
  const [files, setFiles] = useState<FileList | null>(null);

  // Internal state
  const [isUploading, setIsUploading] = useState(false);

  const [isWalletAccountEqual, setIsWalletAccountEqual] = useState(false);

  useEffect(() => {
    // Check if the wallet account is equal to the master account

    if (account && masterAccounts.find((masterAccount: string) => masterAccount === account.address)) {
      setIsWalletAccountEqual(true);
    } else {
      setIsWalletAccountEqual(false);
    }
  }, [account]);

  // Local Ref
  const inputRef = useRef<HTMLInputElement>(null);

  // On show time change
  const onShowTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setShowTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    showDate?.setHours(hours);
    showDate?.setMinutes(minutes);
    showDate?.setSeconds(0);
    setShowDate(showDate);
  };

  // On publish mint start date selected
  const onPublicMintStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintStartTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintStartDate?.setHours(hours);
    publicMintStartDate?.setMinutes(minutes);
    publicMintStartDate?.setSeconds(0);
    setPublicMintStartDate(publicMintStartDate);
  };

  // On publish mint end date selected
  const onPublicMintEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintEndTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintEndDate?.setHours(hours);
    publicMintEndDate?.setMinutes(minutes);
    publicMintEndDate?.setSeconds(0);
    setPublicMintEndDate(publicMintEndDate);
  };

  // On create collection button clicked
  const onCreateCollection = async () => {
    try {
      if (!account) throw new Error("Please connect your wallet");
      if (!files) throw new Error("Please upload files");
      if (maxSupply === undefined) throw new Error("Please enter max supply");
      if (account.address !== CREATOR_ADDRESS) throw new Error("Wrong account");
      if (isUploading) throw new Error("Uploading in progress");

      // Set internal isUploading state
      setIsUploading(true);

      // Upload collection files to Irys
      const { projectUri } = await uploadCollectionData(aptosWallet, files);

      // Format the show time
      const formattedShowTime = showDate ? format(showDate, "dd MMM yyyy, HH:mm") : "";

      // Concatenate the description fields
      const collectionDescription = `
        Concert Details: ${concertDetails}
        \n
        Concert Type: ${concertType}
        \n
        Show Time: ${formattedShowTime}
        \n
        Pricing: ${pricing} APT
      `.trim();

      const allowListStartDate = new Date(showDate!.getTime() - 60 * 60 * 1000); // 1 hour before show time
      const allowListEndDate = new Date(showDate!.getTime() + 3 * 60 * 60 * 1000); // 3 hours after show time

      // Submit a create_collection entry function transaction
      const response = await signAndSubmitTransaction(
        createCollection({
          collectionDescription,
          collectionName,
          projectUri,
          maxSupply,
          royaltyPercentage,
          preMintAmount,
          allowList: undefined,
          allowListStartDate: undefined,
          allowListEndDate: undefined,
          allowListLimitPerAccount: undefined,
          allowListFeePerNFT: undefined,
          publicMintStartDate,
          publicMintEndDate,
          publicMintLimitPerAccount,
          publicMintFeePerNFT,
        }),
      );

      // Wait for the transaction to be commited to chain
      const committedTransactionResponse = await aptosClient().waitForTransaction({
        transactionHash: response.hash,
      });

      // const stubName = collectionName + " - Stub";

      // const stubResponse = await signAndSubmitTransaction(
      //   createCollection({
      //     collectionDescription,
      //     collectionName: stubName,
      //     projectUri,
      //     maxSupply,
      //     royaltyPercentage,
      //     preMintAmount,
      //     allowList: undefined,
      //     allowListStartDate: undefined,
      //     allowListEndDate: undefined,
      //     allowListLimitPerAccount: undefined,
      //     allowListFeePerNFT: undefined,
      //     publicMintStartDate: allowListStartDate,
      //     publicMintEndDate: allowListEndDate,
      //     publicMintLimitPerAccount,
      //     publicMintFeePerNFT: 0,
      //   }),
      // );

      // // Wait for the transaction to be commited to chain
      // const committedTransactionStubResponse = await aptosClient().waitForTransaction({
      //   transactionHash: stubResponse.hash,
      // });

      console.log(committedTransactionResponse);
      // console.log(committedTransactionStubResponse);

      //update mapping
      // await updateMapping(
      //   committedTransactionResponse.events[3].data.collection_obj.inner,
      //   committedTransactionStubResponse.events[3].data.collection_obj.inner,
      // );

      await supabase.from("collection_address").insert({
        collection_address: committedTransactionResponse.events[3].data.collection_obj.inner,
        concert_date: showDate,
      });

      // obtain the collection address and stub address
      const collectionAddress = committedTransactionResponse;
      // Once the transaction has been successfully commited to chain, navigate to the `my-collection` page
      if (committedTransactionResponse.success) {
        navigate(`/my-collections`, { replace: true });
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {isWalletAccountEqual ? (
        <>
          <Header />
          <div className="flex flex-col md:flex-row items-start justify-between px-4 py-2 gap-4 max-w-screen-xl mx-auto">
            <div className="w-full md:w-2/3 flex flex-col gap-y-4 order-2 md:order-1">
              {(!account || account.address !== CREATOR_ADDRESS) && (
                <WarningAlert title={account ? "Wrong account connected" : "No account connected"}>
                  To continue with creating your collection, make sure you are connected with a Wallet and with the same
                  profile account as in your COLLECTION_CREATOR_ADDRESS in{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    .env
                  </code>{" "}
                  file
                </WarningAlert>
              )}

              <UploadSpinner on={isUploading} />

              <Card>
                <CardHeader>
                  <CardDescription>Upload images of the concert and ticket, along with the metadata</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-start justify-between">
                    {!files?.length && (
                      <Label
                        htmlFor="upload"
                        className={buttonVariants({
                          variant: "outline",
                          className: "cursor-pointer",
                        })}
                      >
                        Choose Folder to Upload
                      </Label>
                    )}
                    <Input
                      className="hidden"
                      ref={inputRef}
                      id="upload"
                      disabled={isUploading || !account}
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

              <div className="flex item-center gap-4 mt-4">
                <DateTimeInput
                  id="mint-start"
                  label="Ticket Sales Start Date"
                  tooltip="When sales becomes active"
                  disabled={isUploading || !account}
                  date={publicMintStartDate}
                  onDateChange={setPublicMintStartDate}
                  time={publicMintStartTime}
                  onTimeChange={onPublicMintStartTime}
                  className="basis-1/2"
                />

                <DateTimeInput
                  id="mint-end"
                  label="Ticket Sales End Date"
                  tooltip="When sales finishes"
                  disabled={isUploading || !account}
                  date={publicMintEndDate}
                  onDateChange={setPublicMintEndDate}
                  time={publicMintEndTime}
                  onTimeChange={onPublicMintEndTime}
                  className="basis-1/2"
                />
              </div>

              <LabeledInput
                id="collection-name"
                required
                label="Concert Title"
                tooltip="Title of the concert"
                disabled={isUploading || !account}
                onChange={(e) => {
                  setCollectionName(e.target.value);
                }}
                type="text"
              />

              <LabeledInput
                id="concert-details"
                required
                label="Concert Details"
                tooltip="Details about the concert"
                disabled={isUploading || !account}
                onChange={(e) => {
                  setConcertDetails(e.target.value);
                }}
                type="text"
              />

              <LabeledInput
                id="concert-type"
                required
                label="Concert Catergory"
                tooltip="The type of seating, such as CAT1, CAT2 etc."
                disabled={isUploading || !account}
                onChange={(e) => {
                  setConcertType(e.target.value);
                }}
                type="text"
              />

              <div className="flex item-center gap-4 mt-4">
                <DateTimeInput
                  id="show-date"
                  label="Show Date"
                  tooltip="Date of the concert showing"
                  disabled={isUploading || !account}
                  date={showDate}
                  onDateChange={setShowDate}
                  time={showTime}
                  onTimeChange={onShowTimeChange}
                  className="basis-1/2"
                />
              </div>

              <LabeledInput
                id="max-supply"
                required
                label="Number of Seats"
                tooltip="The maximum number of seats that is offered for this concert"
                disabled={isUploading || !account}
                onChange={(e) => {
                  setMaxSupply(parseInt(e.target.value));
                }}
              />

              <LabeledInput
                id="mint-limit"
                required
                label="Limit per buyer"
                tooltip="How many tickets an individual is allowed to buy"
                disabled={isUploading || !account}
                onChange={(e) => {
                  setPublicMintLimitPerAccount(parseInt(e.target.value));
                }}
              />

              <LabeledInput
                id="mint-fee"
                required
                label="Ticket Price"
                tooltip="The fee the buyer is paying the distributor when they buy a ticket, denominated in APT"
                disabled={isUploading || !account}
                onChange={(e) => {
                  setPublicMintFeePerNFT(Number(e.target.value));
                  setPricing(Number(e.target.value));
                }}
              />

              <ConfirmButton
                title="Add Concert Event"
                className="self-start"
                onSubmit={onCreateCollection}
                disabled={
                  !account ||
                  !files?.length ||
                  !publicMintStartDate ||
                  !publicMintLimitPerAccount ||
                  !account ||
                  isUploading
                }
                confirmMessage={
                  <>
                    <p>The upload process requires at least 2 message signatures</p>
                    <ol className="list-decimal list-inside">
                      <li>To upload collection cover image file and NFT image files into Irys.</li>

                      <li>To upload collection metadata file and NFT metadata files into Irys.</li>
                    </ol>
                    <p>
                      In the case we need to fund a node on Irys, a transfer transaction submission is required also.
                    </p>
                  </>
                }
              />
            </div>

            {/* <Button
              variant="link"
              className="self-start order-1 md:order-2"
              onClick={() => }
            /> */}
          </div>
        </>
      ) : (
        <div>Only the master account can create a concert event</div>
      )}
    </>
  );
}

export default CreateCollection;