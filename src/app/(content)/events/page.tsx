"use client";
import { useEffect, useState } from "react";

// const INITIAL_STATE = [
//   {
//     id: Math.random(),
//     eventName: "Running",
//     description: "Going for a run",
//     date: "2024-12-03",
//     time: "12:30 pm",
//     capacity: "12",
//     eventType: "Type 2",
//   },
//   {
//     id: Math.random(),
//     eventName: "Walking",
//     description: "Going for a run",
//     date: "2024-12-03",
//     time: "12:30 pm",
//     capacity: "12",
//     eventType: "Type 2",
//   },
//   {
//     id: Math.random(),
//     eventName: "Studying",
//     description: "Going for a run",
//     date: "2024-12-03",
//     time: "12:30 pm",
//     capacity: "12",
//     eventType: "Type 2",
//   },
// ];

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(function () {
    fetch(`/api/get-events`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { result } = data;
        console.log(data.result.rows);
        setEvents(result?.rows);
      })
      .catch((error) => console.log(error.message));
  }, []);

  function joinHandler(userId: string, eventId: number) {
    // Do a get query to check if an event exists where userId and eventId match the table in the db.
    // if there is no match then the user can join
    // else the user cannot join again
  }

  return (
    <div className="flex flex-wrap gap-4">
      {events.map((event: any) => {
        return (
          <div key={event.eventid} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-bold">{event.eventname}</h3>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2">
              <span className="font-bold">{event.eventdate}</span>
              <span className="mx-2">at</span>
              {event.eventtime}
            </p>
            <p className="mt-2">Capacity: {event.capacity}</p>
            <p className="mt-2">Event Type: {event.eventtype}</p>
            <button onClick={() => joinHandler(event.userid, event.eventid)}>
              Join Event
            </button>
          </div>
        );
      })}
    </div>
  );
}
