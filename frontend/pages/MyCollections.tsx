import { Link, useNavigate } from "react-router-dom";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
// Internal components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { Image } from "@/components/ui/image";
// Internal hooks
import { useGetCollections } from "@/hooks/useGetCollections";
// Internal constants
import { NETWORK, COLLECTION_ADDRESS } from "@/constants";

export function MyCollections() {
  const collections: Array<GetCollectionDataResponse> = useGetCollections();

  // If we are on Production mode, redierct to the mint page
  const navigate = useNavigate();
  if (import.meta.env.PROD) navigate("/", { replace: true });

  const handleCollectionClick = (collectionId: string) => {
    // Here you set the collection address in your env file
    localStorage.setItem(COLLECTION_ADDRESS, collectionId);

    // Navigate to the explorer URL with a full page reload
    window.location.href = "/";
  };

  return (
    <>
      <Header/>
      <Table className="max-w-screen-xl mx-auto">
        {!collections.length && (
          <TableCaption>A list of the concerts created under the current contract.</TableCaption>
        )}
        <TableHeader>
          <TableRow>
            <TableHead>Collection</TableHead>
            <TableHead>Collection Address</TableHead>
            <TableHead>Minted NFTs</TableHead>
            <TableHead>Max Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collections.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collections.map((collection: any) => {
              return (
                <TableRow key={collection?.collection_id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Image
                        src={collection?.cdn_asset_uris?.cdn_image_uri ?? ""}
                        rounded
                        className="w-10 h-10 bg-gray-100 shrink-0"
                      />
                      <a
                        href="#"
                        onClick={() => handleCollectionClick(collection?.collection_id)}
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                      >
                        {collection?.collection_name}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`https://explorer.aptoslabs.com/object/${collection?.collection_id}?network=${NETWORK}`}
                      target="_blank"
                      style={{ textDecoration: "underline" }}
                    >
                      {collection?.collection_id}
                    </Link>
                  </TableCell>
                  <TableCell>{collection?.total_minted_v2}</TableCell>
                  <TableCell>{collection?.max_supply}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </>
  );
}
