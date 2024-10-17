import { z } from "zod";

export const FormSchema = z.object({
  eventName: z.string().min(1, "Event must have a name"),
  description: z.string().min(1, "Description is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"), 
  capacity: z
    .number({ message: "Capacity must be a number" })
    .gt(0, "Capacity must be at least 1"),
});

// infer type is needed here.
