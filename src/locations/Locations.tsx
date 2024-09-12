import { Location } from './Location';

import { useEffect, useState } from 'react';
import { Provider, useLocationProvider } from './location-providers/useLocationProvider';
import { UserLocation } from './types';
import { MainLayout } from '../main-layout/MainLayout';

export function Locations(props: { user: string }) {
    const [locations, setLocations] = useState<UserLocation[]>([]);
    const [provider, setProvider] = useState<Provider>();
    const locationProvider = useLocationProvider(provider);

    useEffect(() => locationProvider.init(props.user), [locationProvider])

    useEffect(() => locationProvider.subscribeToLocationUpdates(setLocations), [locationProvider]);

    useEffect(() => {
        const interval = setInterval(() => {
            locationProvider.refreshLocations(setLocations)
        }, 1000 * 60);

        return () => clearInterval(interval);
    }, [locationProvider]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            console.log(e.clientX, e.clientY);
            locationProvider.update(props.user, {
                x: e.clientX,
                y: e.clientY,
            });
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [locationProvider]);

    return (
        <MainLayout
            side={
                <>
                    <div>You are: {props.user}</div>
                    <select id="providers-selector" value={provider} onChange={(e) => {
                        setLocations([]);
                        setProvider(e.target.value as Provider);
                    }}>
                        <option value="">--Please choose an option--</option>
                        <option value="firestore">Firestore</option>
                        <option value="realtimedb">Realtime Database</option>
                        <option value="websocket">WebSocket (unimplemented)</option>
                    </select>
                    <pre>{JSON.stringify(locations, null, 2)}</pre>
                </>}
            main={
                <>
                    {locations
                        .filter(location => (location.x !== 0 || location.y !== 0) && location.name !== props.user)
                        .map((location, idx) => <Location key={idx} x={location.x} y={location.y} userName={location.name} />)}
                </>

            }
        />

    )
}