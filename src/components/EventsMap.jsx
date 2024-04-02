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

export default function EventsMap({ events }) {
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

  useEffect(function () {
    getEvents();
  }, []);

  async function getEvents() {
    try {
      await fetch(`/api/get-events`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { result } = data;
          console.log(data.result.rows);
          setEvents(result?.rows);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.eventsMapContainer}>
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
        {events.map((event) => (
          <Marker key={event.eventid} position={[event.lat?? 5, event.lng ?? 6]}>
            <Popup>
                <span>event.eventname</span>
                <span>event.eventdata</span>
                <span>event.eventtime</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
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
  map.setView(position);
  return null;
}

function DetectClick() {
  const router = useRouter();
  useMapEvents({
    // click: (e) => {
    //   router.push(`/createEvent?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    // },
  });

  return null;
}
