type CreatedEvent = {
    capacity: number;             // Number of participants allowed
    description: string;          // Description of the event
    eventTags: string[];          // Array of tags describing the event
    eventDate: string;            // Date of the event in "YYYY-MM-DD" format
    eventid: number;              // Unique ID for the event
    eventLocation: string | null; // Location of the event (null if not provided)
    eventName: string;            // Name of the event
    eventTime: string;            // Time of the event in "HH:mm" format
    userid: string;               // ID of the user who created the event
  };

  type OmittedEvent = Omit<CreatedEvent, "eventTags" | "eventLocation">;
  