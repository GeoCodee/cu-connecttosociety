import { ToastContainer } from "react-toastify"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateEventsForm from "@/components/CreateEventsForm"

export default function CreateEventPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f1729] p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-green-500 border-t-4 bg-white">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold text-gray-800">Create New Event</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <CreateEventsForm />
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  )
}