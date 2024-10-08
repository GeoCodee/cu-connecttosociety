"use client";

import Map from "@/components/Map";
import { useUrlPosition } from "@/components/hooks/useUrlPosition";
import { useRef, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

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
  const eventName = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);
  const capacity = useRef<HTMLInputElement>(null);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAutoSelectTags = async () => {
    if (!description.current?.value) {
      toast.error(
        "Please enter a description before auto-selecting tags.",
        toastProperties
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/generateTagsByDescription", {
        description: description.current.value,
      });

      const aiSelectedTags = response.data;
      setSelectedTags(
        aiSelectedTags.filter((tag: string) => TAGS.includes(tag))
      );
    } catch (error) {
      console.error("Error auto-selecting tags:", error);
      toast.error(
        "An error occurred while auto-selecting tags. Please try again.",
        toastProperties
      );
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newEvent = {
      eventName: eventName.current?.value,
      description: description.current?.value,
      date: date.current?.value,
      time: time.current?.value,
      capacity: capacity.current?.value,
      eventType: selectedTags, // Include the selected tags here
      eventlocation: cityName,
      lat,
      lng,
    };

    try {
      console.log("Submitting event:", newEvent);
      const response = await fetch("/api/add-event", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      await toast.success("Event Created Successfully", toastProperties);

      // Use the router for navigation instead of window.location
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.", toastProperties);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="event-name" className="text-sm font-medium">
              Event Name
            </label>
            <Input ref={eventName} id="event-name" type="text" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Event Description
            </label>
            <Textarea ref={description} id="description" rows={4} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="event-location" className="text-sm font-medium">
              Where is the Event?
            </label>
            <Map />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="event-date" className="text-sm font-medium">
                When is the Event?
              </label>
              <Input ref={date} id="event-date" type="date" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="event-time" className="text-sm font-medium">
                What time is the Event?
              </label>
              <Input ref={time} id="event-time" type="time" required />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="capacity" className="text-sm font-medium">
              How many people can join the event?
            </label>
            <Input
              ref={capacity}
              id="capacity"
              type="number"
              min={1}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Event Categories</label>
              <Button
                type="button"
                onClick={handleAutoSelectTags}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? "Processing..." : "Auto Select Tags With AI"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedTags.includes(tag) ? "bg-green-400 text-black" : ""
                  }`}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((t) => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Add Event
          </Button>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
