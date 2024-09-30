/*this file will ensure when user clicks on open map button of 
landing page, it will went to the map shows pins of events
*/
import dynamic from "next/dynamic";

// Dynamically load the Map component to prevent server-side rendering issues with Leaflet
const DynamicMap = dynamic(() => import("../../components/Map"), {
  ssr: false, // Disable server-side rendering for Leaflet
});

export default function MapPage() {
  return (
    <div>
      <h1 className="text-4xl text-center mt-8 mb-4">Event Map</h1>
      <DynamicMap />
    </div>
  );
}
