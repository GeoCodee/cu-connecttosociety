"use client";

import EventCard from "@/components/component/event-card";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Search";
import Loading from "@/app/loading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const toastProperties = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
} as const;

export default function EventsPage() {
  const [events, setEvents] = useState<CreatedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [suggestedEvents, setSuggestedEvents] = useState<CreatedEvent[]>([]);
  const [userTags, setUserTags] = useState<string[]>([]);

  useEffect(() => {
    getEvents();
    getUserProfileAndSuggestedEvents();
  }, []);

  async function getUserProfileAndSuggestedEvents() {
    try {
      const response = await fetch(
        `/api/functions/profileFunctions/getProfileInfoById`
      );
      const data = await response.json();
      console.log("Profile data:", JSON.stringify(data, null, 2));

      if (data.result?.interest_tags) {
        setUserTags(data.result.interest_tags);

        const response = await fetch(`/api/get-events`);
        const eventsData = await response.json();
        const allEvents = eventsData.result?.rows || [];

        const suggested = allEvents.filter((event: CreatedEvent) =>
          event.eventtags?.some((tag) =>
            data.result.interest_tags.includes(tag)
          )
        );

        setSuggestedEvents(suggested);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  async function getEvents() {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-events`);
      const data = await response.json();
      setEvents(data.result?.rows || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function searchEvents(tagStatement: string[], tag: string) {
    if (tagStatement.length === 0) {
      return getEvents();
    }
    try {
      const response = await fetch(
        `/api/get-events-by-tags?filter=${tagStatement}`
      );
      const data = await response.json();
      setEvents(data.result || []);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function joinHandler(eventId: number) {
    try {
      const response = await fetch(`/api/join-event`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });
      const data = await response.json();
      await getEvents();
      await getUserProfileAndSuggestedEvents();
      toast.success(data.returnProperties.message, toastProperties);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to join event", toastProperties);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col space-y-6 items-center w-full px-4 sm:px-6 py-4 sm:py-8">
      {/* Header Section */}
      <div className="w-full text-center space-y-2 px-2">
        <h1 className="text-2xl sm:text-3xl text-green-500 font-bold">
          Discover Events
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Find and join events that match your interests
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-3xl px-2">
        <Search searchEvents={searchEvents} reset={getEvents} />
      </div>

      <ToastContainer position="bottom-center" className="mb-safe" />

      {/* Events Sections */}
      <div className="w-full max-w-7xl">
        <Accordion
          type="multiple"
          defaultValue={["suggested-events"]}
          className="space-y-4"
        >
          {suggestedEvents.length > 0 && (
            <AccordionItem
              value="suggested-events"
              className="border border-green-200 rounded-lg bg-green-50/30 px-3 sm:px-4"
            >
              <AccordionTrigger className="hover:no-underline py-3 sm:py-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lg sm:text-xl font-bold text-green-600">
                    Suggested Events
                  </span>
                  <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    {suggestedEvents.length}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-3 sm:py-4">
                  {suggestedEvents.map((event) => (
                    <EventCard
                      key={`suggested-${event.eventid}`}
                      imageUrl={event.imageurl}
                      eventId={event.eventid}
                      eventName={event.eventname}
                      eventDescription={event.description}
                      eventHost={event.userid}
                      eventLocation={event.eventlocation}
                      eventDate={event.eventdate}
                      eventStart={event.eventtime}
                      capacity={event.capacity}
                      eventTags={event.eventtags}
                      joinEvent={() => joinHandler(event.eventid)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem
            value="all-events"
            className="border border-zinc-200 rounded-lg bg-zinc-50/30 px-3 sm:px-4"
          >
            <AccordionTrigger className="hover:no-underline py-3 sm:py-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg sm:text-xl font-bold">All Events</span>
                <span className="bg-zinc-100 text-zinc-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                  {events.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-3 sm:py-4">
                {events.map((event) => (
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
                    eventTags={event.eventtags}
                    joinEvent={() => joinHandler(event.eventid)}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
