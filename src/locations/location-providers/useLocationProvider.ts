import { firestoreLocationProvider } from "./firestore";
import { realtimeDbLocationProvider } from "./realtime-db";
import { LocationProvider } from "./types";
import { socketLocationProvider } from "./websocket";

export type Provider = 'firestore' | 'realtimedb' | 'websocket';
export function useLocationProvider(providerName: Provider | undefined): LocationProvider {
    const providersMap: Record<Provider, LocationProvider> = {
        firestore: firestoreLocationProvider,
        realtimedb: realtimeDbLocationProvider,
        websocket: socketLocationProvider,
    };

    return providerName ? providersMap[providerName] : mockLocationProvider;
}


const mockLocationProvider: LocationProvider = {
    init() {
        console.log('select a provider')
    },
    name: 'mock',
    refreshLocations() {
        console.log('select a provider')
    },
    subscribeToLocationUpdates() {
        console.log('select a provider');

        return () => { };
    },
    update() {
        console.log('select a provider')
    },
}

