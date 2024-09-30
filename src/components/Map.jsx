"use client"; // Add this line to make the component a client component

import { useEffect, useState } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "./Button";
import { useUrlPosition } from "./hooks/useUrlPosition";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dummy event data (you can replace this with dynamic data from an API or database)
const events = [
  { name: "Community Cleanup", lat: 37.7749, lng: -122.4194 },
  { name: "Charity Run", lat: 34.0522, lng: -118.2437 },
  { name: "Local Food Drive", lat: 40.7128, lng: -74.0060 },
];

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([parseFloat(lat), parseFloat(lng)]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers for each event */}
        {events.map((event, index) => (
          <Marker key={index} position={[event.lat, event.lng]}>
            <Popup>{event.name}</Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const router = useRouter();
  useMapEvents({
    click: (e) => {
      router.push(`/createEvent?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
