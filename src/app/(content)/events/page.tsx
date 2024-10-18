"use client";

import EventCard from "@/components/component/event-card";
import { useState, useEffect, Suspense } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Search";
import Loading from "@/app/loading";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents();
  }, []);

  async function getEvents() {
    setLoading(true);
    try {
      await fetch(`/api/get-events`)
        .then((response) => response.json())
        .then((data) => {
          const { result } = data;
          setEvents(result?.rows);
          setLoading(false); // Hide loading state
        });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Hide loading state even on error
    }
  }

  async function searchEvents(tagStatement: string[], tag: string) {
    if(tagStatement.length === 0) {
      getEvents();
    }
    try {
      const response = await fetch(`/api/get-events-by-tags?filter=${tagStatement}`);
      const data = await response.json();
      const { result } = data;
      console.log(result)
      setEvents(result);
      // setLoading(false);
    } catch (error) {
      console.log("Error", error);
      // setLoading(false);
    }
  }
  

  // function searchEvents(tags: string[], tag: string) {
  //   if (tag === undefined) {
  //     setEvents((prev) => {
  //       const filteredEvents = prev.filter((current) => {
  //         return tags.some((tag) => current?.eventTags.includes(tag));
  //       });
  //       return filteredEvents;
  //     });
  //   } else {
  //     setEvents((prev) =>
  //       prev.filter((current) => current.eventTags.includes(tag))
  //     );
  //   }
  // }

  async function joinHandler(eventId: any) {
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

  if (loading) {
    // Render the loading component when the loading state is true
    return <Loading />;
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
            capacity={event.capacity}
            joinEvent={() => joinHandler(event.eventid)}
          />
        ))}
      </div>
    </div>
  );
}
