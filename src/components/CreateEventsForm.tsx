"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Map from "./Map";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GEOCODE_URL, TAGS } from "@/utils/utilities";
import { Bounce, toast } from "react-toastify";
import ImagePicker from "./ImagePicker";
import axios from "axios";
import { useUrlPosition } from "./hooks/useUrlPosition";
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import { FormSchema } from "@/utils/formSchema";

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

export default function CreateEventsForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OmittedEvent>({
    resolver: zodResolver(FormSchema),
  });
  // const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState<string>("");
  const [file, setFile] = useState<File>();
  const description = watch("description");

  const onSubmit: SubmitHandler<OmittedEvent> = async function (data) {
    const newEvent: CreatedEvent = {
      eventTags: selectedTags,
      eventLocation: cityName,
      ...data,
    };
    const formData = new FormData();
    formData.append("createdEvent", JSON.stringify(newEvent));
    formData.append("file", file);

    try {
      const response = await fetch("/api/add-event", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to create event");
      }

      await toast.success("Event Created Successfully", toastProperties);
      // router.push("/events")
    } catch (error) {
      toast.error("Failed to create event. Please try again.", toastProperties);
    }
  };

  useEffect(
    function () {
      fetch(`${GEOCODE_URL}?latitude=${lat}&longitude=${lng}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.countryCode) {
            throw new Error(
              "That doesn't seem like a city. Click somewhere else :("
            );
          }
          setCityName(data.city || "f");
        })
        .catch((error) => console.log(error.message));
    },
    [lat, lng]
  );

  const handleAutoSelectTags = async (description: string) => {
    if (!description) {
      toast.error(
        "Please enter a description before auto-selecting tags.",
        toastProperties
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/generateTagsByDescription", {
        description: description,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="event-name" className="text-sm font-medium">
          Event Name
        </label>
        <Input {...register("eventName")} id="event-name" type="text" />
        {errors.eventName && (
          <span className="text-red-500">{errors.eventName.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Event Description
        </label>
        <Textarea
          {...register("description")}
          id="description"
          rows={4}
          placeholder="Tell us about your event"
          maxLength={255}
        />
        <p className="text-sm text-gray-500 text-right">
          {description?.length || 0}/255
        </p>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
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
          <Input {...register("eventDate")} id="event-date" type="date" />
        </div>

        <div className="space-y-2">
          <label htmlFor="event-time" className="text-sm font-medium">
            What time is the Event?
          </label>
          <Input {...register("eventTime")} id="event-time" type="time" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="capacity" className="text-sm font-medium">
          How many people can join the event?
        </label>
        <Input
          {...register("capacity", { valueAsNumber: true })}
          id="capacity"
          type="number"
          min={1}
        />
        {errors.capacity && (
          <span className="text-red-500">{errors.capacity.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Event Categories</label>
          <Button
            type="button"
            onClick={() => handleAutoSelectTags(description)}
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
      <ImagePicker setFile={setFile} />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting Event" : "Add Event"}
      </Button>
    </form>
  );
}
