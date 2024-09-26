"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <header className="p-6 flex justify-center items-center bg-white shadow-md">
        <h1 className="text-3xl font-bold text-green-600">
          Connect to Society
        </h1>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto bg-white shadow-lg">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center">
              Welcome to Connect to Society
            </CardTitle>
            <CardDescription className="text-center text-lg text-green-100">
              Bringing communities together, one connection at a time.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center p-8">
            <p className="mb-8 text-gray-700 text-lg">
              Connect to Society is a platform designed to help you engage with
              your local community, find events, and make meaningful connections
              with people around you.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
              <Link href="/events">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white"
                >
                  Explore Events
                </Button>
              </Link>
              <Link href="/createEvent">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-green-500 text-green-500 hover:bg-green-50"
                >
                  Create an Event
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
