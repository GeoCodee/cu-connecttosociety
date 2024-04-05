"use client";

import EventCard from "@/components/component/event-card";
import { eventDetails } from "@/components/component/event-card";

const testDetails: eventDetails = {
  eventId: 1,
  eventName: "Test Name",
  eventDescription: "testDescription",
  eventHost: "Geo",
  eventLocation: "Missisauga",
  eventDate: "2024-04-02",
  eventStart: "10:00",
  eventEnd: "12:00",
  capacity: 2,
};

export default function Profile() {
  return (
    <div className="flex flex-wrap gap-4">
      <EventCard {...testDetails}></EventCard>
      {/* <EventCard></EventCard> */}
    </div>
  );
}
