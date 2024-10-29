import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapContainerStyle = {
    height: "500px",
    width: "100%",
  };

  const center = {
    lat: 37.7749, // Default center location
    lng: -122.4194,
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/get-events"); // Replace with your API endpoint
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={8}>
        {!loading &&
          events.map((event) => (
            <Marker
              key={event.id}
              position={event.location}
              title={event.name}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
