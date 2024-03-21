"use client";
import { useState } from "react";

const INITIAL_STATE = [
  {
    id: Math.random(),
    eventName: "Running",
    description: "Going for a run",
    date: "2024-12-03",
    time: "12:30 pm",
    capacity: "12",
    eventType: "Type 2",
  },
  {
    id: Math.random(),
    eventName: "Walking",
    description: "Going for a run",
    date: "2024-12-03",
    time: "12:30 pm",
    capacity: "12",
    eventType: "Type 2",
  },
  {
    id: Math.random(),
    eventName: "Studying",
    description: "Going for a run",
    date: "2024-12-03",
    time: "12:30 pm",
    capacity: "12",
    eventType: "Type 2",
  },
];

export default function Events() {
  const [events, setEvents] = useState(INITIAL_STATE);

  return (
    <div className="flex flex-wrap gap-4">
      {events.map((event) => {
        return (
          <div key={event.id} className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-bold">{event.eventName}</h3>
            <p className="mt-2">{event.description}</p>
            <p className="mt-2">
              <span className="font-bold">{event.date}</span> 
              <span className="mx-2">at</span>
              {event.time}
            </p>
            <p className="mt-2">Capacity: {event.capacity}</p>
            <p className="mt-2">Event Type: {event.eventType}</p>
          </div>
        );
      })}
    </div>
  );
}
