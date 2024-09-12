import { Timestamp } from "firebase/firestore";

export type UserLocation = {
    name: string;
    x: number;
    y: number;
    updatedAt: Timestamp;
}