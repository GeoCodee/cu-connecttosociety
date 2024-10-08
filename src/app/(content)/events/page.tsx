"use client";

import EventCard from "@/components/component/event-card";
import { eventDetails } from "@/components/component/event-card";
import { TAGS } from "@/utils/utils";
import { log } from "console";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "./Search";

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

   function searchEvents(tag:string) {
    // setEvents(s => s["event_tags"].filter(t => t.includes(tag)));
    // setEvents(s => {
    //   console.log(s[1]["event_tags"])
    //   return [...s];
    // });
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

  function addFilter(tag: string) {}

  const searchParams = useSearchParams();
  function search(e) {
    e.preventDefault();
    const tag = e.target[0].value;

    // Create a new URLSearchParams object based on the current search params
    const params = new URLSearchParams(searchParams.toString());

    // Append or update the tag parameter
    params.set("tag", tag);

    console.log(params);
  }

  return (
    <div>
      <div>
        <ToastContainer />
      </div>
      <Search searchEvents={searchEvents}  />
      <div className="flex flex-col space-y-4 pl-36">
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

      <div className="flex space-x-4">
        {TAGS.map((tag) => (
          <span onClick={() => addFilter(tag)} className="bg-red-400" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
