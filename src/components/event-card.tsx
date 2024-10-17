/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/kST30UMLXoc
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bounce, ToastContainer, toast } from "react-toastify";

export interface eventDetails {
  eventId: any;
  eventName: any;
  eventDescription: any;
  eventHost: any;
  eventLocation: any;
  eventDate: any;
  eventStart: any;
  eventEnd: any;
  capacity: any;
  // joinEvent(eventId: any): void;
}

//eventPostPic;
//eventJoinersPic;

export default function EventCard({
  eventId,
  eventName,
  eventDescription,
  eventLocation,
  eventDate,
  eventStart,
  capacity,
  joinEvent,
}: any) {
  const [hostImageUrl, setHostImageUrl] = useState(null);
  const [participantsImageUrl, setParticipantsImageUrl] = useState<string[]>(
    []
  );
  const [hostName, setHostName] = useState(null);

  useEffect(() => {
    const fetchHostIcon = async () => {
      try {
        const fetchUserIdByEventId = await fetch(
          `/api/functions/getHostByEventId?eventId=${eventId}`
        );

        if (!fetchUserIdByEventId.ok) {
          throw new Error(`Network reponse was not ok`);
        }

        const hostData = await fetchUserIdByEventId.json();
        console.log("data: ", hostData);

        setHostImageUrl(hostData.userInfo.imageUrl);
        setHostName(hostData.userInfo.firstName);
      } catch (error) {
        throw new Error(`Can't fetch Host Images`);
      }
    };

    const fetchParticipants = async () => {
      try {
        const fetchParticipantIdsByEventId = await fetch(
          `/api/functions/getParticipantsByEventId?eventId=${eventId}`
        );

        if (!fetchParticipantIdsByEventId.ok) {
          throw new Error(`Network response was not ok`);
        }

        const participantsData = await fetchParticipantIdsByEventId.json();
        console.log("Data:", participantsData);

        const participantsImageUrl: any[] = [];

        participantsData.userIds.map((participant: any) => {
          console.log(participant);
          participantsImageUrl.push(participant.imageUrl);
        });

        setParticipantsImageUrl(participantsImageUrl);

        console.log("Data:", participantsImageUrl);
      } catch (error) {
        throw new Error(`Can't fetch Participant Images`);
      }
    };
    // const fetchParticipantsIcons = await fetch(
    //   `/api/functions/getP`
    // )

    fetchHostIcon();
    fetchParticipants();
  }, [eventId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full max-w-[280px] h-[180px] rounded-lg border flex flex-col overflow-hidden cursor-pointer">
          <CardHeader className="p-2 space-y-0.5 flex-shrink-0">
            <CardTitle className="text-base font-bold truncate">
              {eventName}
            </CardTitle>
            <CardDescription className="text-xs line-clamp-1">
              {eventDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 flex-grow text-xs space-y-1">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              <span>
                {eventDate} at {eventStart}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-3 h-3" />
              <span className="truncate">{eventLocation}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserGroupIcon className="w-3 h-3" />
              <span>{capacity} spots</span>
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t">
            <Button
              className="w-full py-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                joinEvent(eventId);
              }}
            >
              Join Event
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{eventName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm">{eventDescription}</p>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {eventDate} at {eventStart}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" />
            <span>{eventLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <UserGroupIcon className="w-4 h-4" />
            <span>{capacity} spots</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Host</h3>
            <div className="flex items-center gap-2">
              {hostImageUrl && (
                <Image
                  src={hostImageUrl}
                  alt={hostName || "Host"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span>{hostName}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Participants</h3>
            <div className="flex flex-wrap gap-2">
              {participantsImageUrl.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Participant ${index + 1}`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
        <Button onClick={() => joinEvent(eventId)}>Join Event</Button>
      </DialogContent>
    </Dialog>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function UserGroupIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <path d="M8 7v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V7" />
      <path d="M7 7h10" />
      <path d="M7 13h10" />
      <path d="M17 7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7z" />
    </svg>
  );
}
