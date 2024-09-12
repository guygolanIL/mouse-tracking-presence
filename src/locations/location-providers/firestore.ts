import { Firestore, firestore } from "../../firebase";
import { UserLocation } from "../types";
import { LocationProvider } from "./types";

function getLocationQuery() {
    const tenMinutesAgoDate = new Date(Date.now() - 10 * 60 * 1000);
    const tenMinutesAgo = Firestore.Timestamp.fromDate(tenMinutesAgoDate);

    const q = Firestore.query(
        Firestore.collection(firestore, 'locations'),
        Firestore.where('updatedAt', '>=', tenMinutesAgo)
    );

    return q;
}

function fromSnapshotToUserLocations(snapshot: Firestore.QuerySnapshot): UserLocation[] {
    return snapshot.docs.map(doc => ({ name: doc.id, ...doc.data() as any }));
}

export const firestoreLocationProvider: LocationProvider = {
    name: 'firestore',
    init: (user) => {
        const userData = {
            x: 0,
            y: 0,
            updatedAt: Firestore.serverTimestamp(),
        };
        Firestore.setDoc(Firestore.doc(firestore, "locations", user), userData);
    },
    subscribeToLocationUpdates(cb: (locations: UserLocation[]) => void) {
        const q = getLocationQuery();

        const unsubscribe = Firestore.onSnapshot(q, snapshot => cb(fromSnapshotToUserLocations(snapshot)));
        return unsubscribe;
    },
    refreshLocations(cb: (locations: UserLocation[]) => void) {
        Firestore.getDocs(getLocationQuery()).then(snapshot => {
            cb(fromSnapshotToUserLocations(snapshot));
        });
    },
    update(user, { x, y }) {
        Firestore.updateDoc(Firestore.doc(firestore, 'locations', user), {
            x,
            y,
            updatedAt: Firestore.serverTimestamp(),
        });
    },
};
