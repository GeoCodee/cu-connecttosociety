import { ToastContainer } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateEventsForm from "@/components/CreateEventsForm";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function CreateEventPage() {
  // const router = useRouter();
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <CreateEventsForm />
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
