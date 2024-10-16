"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapIcon, UserCircle } from "lucide-react";
import Script from "next/script";
import { useEffect } from "react";
import { GEOCODE_URL } from "@/utils/utilities";

export default async function Home() {
  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "/gradient.js";
    scriptElement.defer = true;
    document.body.appendChild(scriptElement);

    // Clean up the script when the component is unmounted or when the effect is re-triggered
 
  }, []);
  return (
    <>
      <canvas
        id="gradient-canvas"
        className="w-[400%] h-[770px] -rotate-[10deg] absolute -top-[600px] -left-[78%] -z-10 overflow-x-hidden"
      ></canvas>

      <div className="min-h-screen relative z-20 ">
        {" "}
        {/* z-20 ensures the content is above the canvas */}
        {/* <Script src="/gradient.js" defer strategy="afterInteractive"></Script> */}
        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-16 relative z-30">
            {" "}
            {/* Ensuring section is above the gradient */}
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
              Connect to Society
            </h1>
            <p className="text-xl md:text-2xl text-green-300 mb-8">
              Your instant gateway to local experiences and connections
            </p>
            <Link href={"/events"}>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-blue-950"
              >
                Get Started
              </Button>
            </Link>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-16 relative z-30">
            {" "}
            {/* Ensuring section is above the gradient */}
            {[
              {
                title: "Instant Access",
                description: "Join activities happening right now in your area",
              },
              {
                title: "Diverse Experiences",
                description:
                  "From cooking classes to yoga sessions, find your passion",
              },
              {
                title: "Community Driven",
                description:
                  "Connect with like-minded individuals and create memories",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-blue-900 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-green-300">{feature.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-16 text-center relative z-30">
            {" "}
            {/* Ensuring section is above the gradient */}
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              Discover What's Happening Near You
            </h2>
            <Link href="/map" passHref>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-blue-950"
              >
                <MapIcon className="mr-2 h-5 w-5" />
                Open Map
              </Button>
            </Link>
          </section>

          <section className="text-center relative z-30">
            {" "}
            {/* Ensuring section is above the gradient */}
            <h2 className="text-3xl font-bold text-green-400 mb-4">
              Ready to Connect?
            </h2>
            <p className="text-xl text-green-300 mb-8">
              Join CU today and start exploring the vibrant community around
              you!
            </p>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-blue-950"
            >
              Sign Up Now
            </Button>
          </section>
        </main>
        <footer className="text-green-300 py-8 mt-48 relative z-30">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 CU - Connect to Society. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
