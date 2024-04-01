"use client";

import Map from "@/components/Map";
import { useUrlPosition } from "@/components/hooks/useUrlPosition";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function EventForm() {
  const eventName = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);
  const capacity = useRef<HTMLInputElement>(null);
  const eventType = useRef<HTMLSelectElement>(null);
  const location = useRef<HTMLInputElement>(null);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");

  useEffect(
    function () {
      // setIsLoadingGeocoding(true);
      // setGeocodingError("");
      fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem like a city. Click somewhere else :("
            );
          }
          console.log(data);
          setCityName(data.city || "");
          // setCountry(data.countryName);
          // setEmoji(convertToEmoji(data.countryCode));
        })
        .catch((error) => console.log(error.message));
      // .finally(() => setIsLoadingGeocoding(false));
    },
    [lat, lng]
  );

  async function onSubmit(e: any) {
    e.preventDefault();
    const newEvent = {
      eventName: eventName.current?.value,
      description: description.current?.value,
      date: date.current?.value,
      time: time.current?.value,
      capacity: capacity.current?.value,
      eventType: eventType.current?.value,
      location: cityName,
    };
    try {
      await fetch("/api/add-event", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (typeof window !== undefined) {
        window.location.href = "/events";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto mt-4">
      <div className="mb-4">
        <label htmlFor="event-name" className="block">
          Event Name
        </label>
        <input
          ref={eventName}
          type="text"
          id="event-name"
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block">
          Event Description
        </label>
        <textarea
          ref={description}
          id="description"
          className="mt-1 p-2 border rounded w-full"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="event-location" className="block">
          Where is the Event?
        </label>
        {/* <input
            ref={location}
            type="text"
            id="event-location"
            className="mt-1 p-2 border rounded w-full"
            required
          /> */}
        <Map />
      </div>
      <div className="mb-4">
        <label htmlFor="event-date" className="block">
          When is the Event?
        </label>
        <input
          ref={date}
          type="date"
          id="event-date"
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="event-time" className="block">
          What time is the Event?
        </label>
        <input
          ref={time}
          type="time"
          id="event-time"
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="capacity" className="block">
          How many people can join the event?
        </label>
        <input
          ref={capacity}
          type="number"
          id="capacity"
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="typeOfEvent" className="block">
          What type of event is this event?
        </label>
        <select
          ref={eventType}
          id="typeOfEvent"
          className="mt-1 p-2 border rounded w-full"
          required
        >
          <option>Type 1</option>
          <option>Type 2</option>
          <option>Type 3</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Event
      </button>
    </form>
  );
}
