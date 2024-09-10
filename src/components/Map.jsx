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

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  // const { cities } = useCities();
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
        {/* <Marker position={[lat?? 0, lng?? 40]}>
          <Popup>Pin</Popup>
        </Marker> */}
        <ChangeCenter position={mapPosition} />

        {/* <PinpointCurrentLocation
          position={mapPosition}
        ></PinpointCurrentLocation> */}

        <DetectClick />
      </MapContainer>
    </div>
  );
}

// interface ChangeCenterProps {
//   position: [number, number];
// }

function ChangeCenter({ position }) {
  const map = useMap();
  // console.log(position);
  map.setView(position);
  return null;
}

function PinpointCurrentLocation({ position }) {
  return position === null ? null : (
    <div>
      <Marker position={position}>
        <Popup>Current Address</Popup>
      </Marker>
    </div>
  );
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
