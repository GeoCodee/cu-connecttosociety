'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapIcon } from "lucide-react"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const scriptElement = document.createElement("script")
    scriptElement.src = "/gradient.js"
    scriptElement.defer = true
    document.body.appendChild(scriptElement)

    return () => {
      document.body.removeChild(scriptElement)
    }
  }, [])

  return (
    <>
      <canvas
        id="gradient-canvas"
        className="w-[400%] h-[770px] -rotate-[10deg] absolute -top-[600px] -left-[78%] -z-10 overflow-x-hidden"
      ></canvas>

      <div className="min-h-screen relative z-20">
        <main className="container mx-auto px-4 py-16 md:py-24">
          <section className="text-center mb-20 relative z-30">
            <h1 className="text-5xl md:text-7xl font-bold text-green-400 mb-6">
              Connect to Society
            </h1>
            <p className="text-xl md:text-3xl text-green-300 mb-10">
              Your instant gateway to local experiences and connections
            </p>
            <Link href="/events">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-blue-950 text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </Link>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-20 relative z-30">
            {[
              {
                title: "Instant Access",
                description: "Join activities happening right now in your area",
              },
              {
                title: "Diverse Experiences",
                description: "From cooking classes to yoga sessions, find your passion",
              },
              {
                title: "Community Driven",
                description: "Connect with like-minded individuals and create memories",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-blue-900 p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h3 className="text-2xl font-semibold text-green-400 mb-4">{feature.title}</h3>
                <p className="text-green-300 text-lg">{feature.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-20 text-center relative z-30">
            <h2 className="text-4xl font-bold text-green-400 mb-8">
              Discover What's Happening Near You
            </h2>
            <Link href="/map" passHref>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-blue-950 text-lg px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MapIcon className="mr-3 h-6 w-6" />
                Open Map
              </Button>
            </Link>
          </section>
        </main>
        <footer className="text-green-300 py-8 mt-auto relative z-30">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 CU - Connect to Society. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}