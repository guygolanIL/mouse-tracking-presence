import { RealtimeDB, rtdb } from '../../firebase';
import { UserLocation } from '../types';
import { LocationProvider } from "./types";

function getLocationQuery() {
    const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
    const recentUpdatesQuery = RealtimeDB.query(
        RealtimeDB.ref(rtdb, 'locations'),
        RealtimeDB.orderByChild('updatedAt'),
        RealtimeDB.startAt(tenMinutesAgo)
    );

    return recentUpdatesQuery;
}

function fromSnapshotToUserLocations(snapshot: RealtimeDB.DataSnapshot): UserLocation[] {
    return Object.entries(snapshot.val()).map(([userId, userData]) => ({ name: userId, ...userData as any }));
}

export const realtimeDbLocationProvider: LocationProvider = {
    name: 'realtimedb',
    init: (user) => {
        RealtimeDB.set(RealtimeDB.ref(rtdb, 'locations/' + user), {
            x: 0,
            y: 0,
            updatedAt: RealtimeDB.serverTimestamp(),
        });
    },
    update(user, { x, y }) {
        RealtimeDB.update(RealtimeDB.ref(rtdb, 'locations/' + user), {
            x, y,
            updatedAt: RealtimeDB.serverTimestamp(),
        });
    },
    subscribeToLocationUpdates(cb) {
        const unsub = RealtimeDB.onValue(getLocationQuery(), (snapshot) => {
            if (!snapshot.exists()) return;
            cb(fromSnapshotToUserLocations(snapshot));
        });
        return unsub;
    },
    refreshLocations(cb) {
        RealtimeDB.get(getLocationQuery()).then((snapshot) => {
            if (!snapshot.exists()) return;
            cb(fromSnapshotToUserLocations(snapshot));
        }).catch(console.error);
    }
}
