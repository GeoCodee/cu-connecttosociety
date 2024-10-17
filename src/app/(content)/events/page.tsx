"use client";

import EventCard from "@/components/component/event-card";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Search";

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

export default function EventsPage() {
  const [events, setEvents] = useState<CreatedEvent[]>([]);


  useEffect(function () {
    getEvents();
  }, []);

  async function getEvents() {
    console.log("reset");
    try {
      await fetch(`/api/get-events`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const { result } = data;
          console.log(data.result.rows);
          setEvents(result?.rows);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function searchEvents(tags: string[], tag: string) {
    if (tag === undefined) {
      setEvents((prev) => {
        const filteredEvents = prev.filter((current) => {
          return tags.some((tag) => current.eventTags.includes(tag));
        });
        return filteredEvents;
      });
    } else {
      setEvents(prev => prev.filter(current => current.eventTags.includes(tag)));
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
          toast.success(data.returnProperties.message, toastProperties);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="flex flex-col space-y-8 items-center  ">
      <Search searchEvents={searchEvents} reset={getEvents} />
        <ToastContainer></ToastContainer>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-4">
        {events.map((event: any) => (
          <EventCard
            key={event.eventid}
            imageUrl={event.imageurl}
            eventId={event.eventid}
            eventName={event.eventname}
            eventDescription={event.description}
            eventHost={event.userid}
            eventLocation={event.eventlocation}
            eventDate={event.eventdate}
            eventStart={event.eventtime}
            // eventEnd={event.eventEnd}
            capacity={event.capacity}
            joinEvent={() => joinHandler(event.eventid)}
          ></EventCard>
        ))}
        {/* <EventCard></EventCard> */}
      </div>
    </div>
  );
}
