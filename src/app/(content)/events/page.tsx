"use client";
import EventsMap from "@/components/EventsMap";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showMap, setShowMap] = useState(false);

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

  async function joinHandler(eventId: any) {
    // Do a get query to check if an event exists where userId and eventId match the table in the db.
    try {
      await fetch(`/api/join-event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      })
        .then((response) => response.json())
        .then((data) => {
          getEvents();
          // const { result } = data;
        });
    } catch (error) {
      console.error("Error:", error);
    }
    // if there is no match then the user can join
    // else the user cannot join again
  }

  return (
    <div className="flex flex-wrap gap-4">
      <button onClick={() => setShowMap((prev) => !prev)}>Show Map</button>
      {showMap ? (
          <EventsMap events={events}/>
      ) : (
        events.map((event: any) => (
          <div key={event.eventid} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-bold">{event.eventname}</h3>
            <p className="mt-2">{event.eventlocation}</p>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2">
              <span className="font-bold">{event.eventdate}</span>
              <span className="mx-2">at</span>
              {event.eventtime}
            </p>
            <p className="mt-2">Capacity: {event.capacity}</p>
            <p className="mt-2">Event Type: {event.eventtype}</p>

            <button onClick={() => joinHandler(event.eventid)}>
              Join Event
            </button>
          </div>
        ))
      )}
    </div>
  );
}
