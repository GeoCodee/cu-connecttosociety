'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapIcon, UserCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-950">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image src="/placeholder.svg?height=40&width=40" alt="CU Logo" width={40} height={40} className="rounded-full bg-white" />
          <span className="text-2xl font-bold text-green-400">CU</span>
        </div>
        <Button variant="ghost" size="icon" aria-label="User menu" className="text-green-400 hover:text-green-300">
          <UserCircle className="h-6 w-6" />
        </Button>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
            Connect to Society
          </h1>
          <p className="text-xl md:text-2xl text-green-300 mb-8">
            Your instant gateway to local experiences and connections
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-blue-950">
            Get Started
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Instant Access", description: "Join activities happening right now in your area" },
            { title: "Diverse Experiences", description: "From cooking classes to yoga sessions, find your passion" },
            { title: "Community Driven", description: "Connect with like-minded individuals and create memories" }
          ].map((feature, index) => (
            <div key={index} className="bg-blue-900 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-400 mb-2">{feature.title}</h3>
              <p className="text-green-300">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Discover What's Happening Near You</h2>
          <Link href="/map" passHref>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-blue-950">
              <MapIcon className="mr-2 h-5 w-5" />
              Open Map
            </Button>
          </Link>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Ready to Connect?</h2>
          <p className="text-xl text-green-300 mb-8">
            Join CU today and start exploring the vibrant community around you!
          </p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600 text-blue-950">
            Sign Up Now
          </Button>
        </section>
      </main>

      <footer className="bg-blue-900 text-green-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CU - Connect to Society. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}