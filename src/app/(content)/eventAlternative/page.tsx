"use client";
import { sendMail, MailProperties } from "@/lib/mail";
import { useEffect, useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserEmailById } from "@/lib/clerkFunction";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [showMap, setShowMap] = useState(false);

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
          // console.log(data.result.rows);
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
    <div className="flex flex-col justify-center items-center">
      <div>
        <ToastContainer />
      </div>
      <div className="flex flex-wrap gap-4">
        {events.map((event: any) => {
          return (
            <div
              key={event.eventid}
              className="bg-gray-100 p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-center items-center"
            >
              <h3 className="text-lg font-bold">{event.eventname}</h3>
              <p className="mt-2">{event.location}</p>
              <p className="mt-2">{event.description}</p>
              <p className="mt-2">
                <span className="font-bold">{event.eventdate}</span>
                <span className="mx-2">at</span>
                {event.eventtime}
              </p>
              <p className="mt-2">Capacity: {event.capacity}</p>
              <p className="mt-2">Event Type: {event.eventtype}</p>

              <button
                onClick={() => joinHandler(event.eventid)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Join Event
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
