"use client";

import Map from "@/components/Map";
import { useUrlPosition } from "@/components/hooks/useUrlPosition";
import { useRef, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const toastProperties: any = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

const TAGS: string[] = [
  "Sports",
  "Video Games",
  "DIY",
  "Music",
  "Movies",
  "Technology",
  "Travel",
  "Cooking",
  "Fitness",
  "Art",
  "Photography",
  "Books",
  "Fashion",
  "Health",
  "Education",
];

export default function EventForm() {
  // const router = useRouter();

  const eventName = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);
  const capacity = useRef<HTMLInputElement>(null);
  const eventType = useRef<HTMLInputElement>(null);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(
    function () {
      fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem like a city. Click somewhere else :("
            );
          }
          console.log(data.city);
          setCityName(data.city || "f");
        })
        .catch((error) => console.log(error.message));
    },
    [lat, lng]
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newEvent = {
      eventName: eventName.current?.value,
      description: description.current?.value,
      date: date.current?.value,
      time: time.current?.value,
      capacity: capacity.current?.value,
      eventType: selectedTags,
      eventlocation: cityName,
      lat,
      lng,
    };
    // console.log(JSON.stringify(newEvent));
    try {
      await fetch("/api/add-event", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await toast.success("Event Created Successfully", toastProperties);

      //need to find alternatives for window.location.href
      if (typeof window !== undefined) {
        window.location.href = "/events";
      }

      // redirect("/events");
      // router.push("/events");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
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
            min={1}
            required
          />
        </div>
        <div className="flex flex-col justify-start items-center mb-4">
          <p>Choose the category that fits this event</p>
          <div className="space-x-2 flex flex-wrap">
            {TAGS.map((tag: string) => (
              <span
                key={tag}
                onClick={() => {
                  if (selectedTags.includes(tag)) {
                    setSelectedTags(
                      selectedTags.filter((selectedTag) => selectedTag !== tag)
                    ); // Deselect
                  } else {
                    setSelectedTags([...selectedTags, tag]); // Select
                  }
                  // Send selectedTags state to the backend
                }}
                className={`${
                  selectedTags.includes(tag) ? "bg-green-500" : "bg-yellow-500"
                } my-2 whitespace-nowrap text-slate-100 p-2 rounded-md hover:cursor-pointer`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded self-center"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}
