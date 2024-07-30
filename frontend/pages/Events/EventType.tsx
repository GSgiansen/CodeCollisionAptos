// @ts-nocheck
import Event from "@/hooks/getEventsAndTickets";
import CASImage from "@/assets/CAS_Concert.jpg" 
import TSImage from "@/assets/TS_ERAS_Concert.jpg" 
//take information from collection data and add to here
// export type Event = {
//     name: string;
//     description: string;
//     id: string;
//     image_uri: string;
//     creator_addr: string;
//     current_supply: number;
//     max_supply: number;
// };


export const CAS : Event = {
    name: "Cigarette After Sex",
    description: "Dont you love some Cigarettes After Sex",
    id: "1",
    image_uri: CASImage,
    creator_addr: "0x06114bc6190d9aa31eeb2c97fbce228c39657d9154360d3546843ddd8e620cc0",
    current_supply: 1,
    max_supply: 2000,
    eventUnixTime: 1721445515,
}

export const TS_ERA : Event= {
    name: "Taylor Swift ERAS",
    description: "Haters gonna hate",
    id: "2",
    image_uri: TSImage,
    creator_addr: "0x06114bc6190d9aa31eeb2c97fbce228c39657d9154360d3546843ddd8e620cc0",
    current_supply: 1,
    max_supply: 50,
    eventUnixTime: 1721445515,
}