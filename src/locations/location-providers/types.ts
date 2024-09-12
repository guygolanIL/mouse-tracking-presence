import { UserLocation } from "../types";

export interface LocationProvider {
    name: string;
    init: (user: string) => void;
    update: (user: string, position: { x: number, y: number }) => void;
    subscribeToLocationUpdates: (cb: (locations: UserLocation[]) => void) => VoidFunction;
    refreshLocations: (cb: (locations: UserLocation[]) => void) => void;
}