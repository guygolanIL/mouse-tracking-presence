import { LocationProvider } from "./types";

export const socketLocationProvider: LocationProvider = {
    name: 'websocket',
    init: () => console.log('init'),
    update() {
        console.log('update');
    },

    subscribeToLocationUpdates() {
        console.log('subscribed')
        return () => { };
    },
    refreshLocations() {

    }
}
