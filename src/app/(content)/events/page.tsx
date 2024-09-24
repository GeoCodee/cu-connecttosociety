"use client";

import EventCard from "@/components/component/event-card";
import { eventDetails } from "@/components/component/event-card";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [events, setEvents] = useState([]);

  // const testDetails: eventDetails = {
  //   eventId: 45,
  //   eventName: "Test Name",
  //   eventDescription: "testDescription",
  //   eventHost: "Geo",
  //   eventLocation: "Missisauga",
  //   eventDate: "2024-04-02",
  //   eventStart: "10:00",
  //   eventEnd: "12:00",
  //   capacity: 2,
  //   // joinEvent(eventId) {
  //   //   joinHandler(eventId);
  //   // },
  // };

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

  useEffect(function () {
    getEvents();
  }, []);

  async function getEvents() {
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
          // console.log(data);
          // const { result } = data;
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <div>
        <ToastContainer></ToastContainer>
      </div>
      <div className="flex flex-wrap gap-4">
        {events.map((event: any) => (
          <EventCard
            key={event.eventid}
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
