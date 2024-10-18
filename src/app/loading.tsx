import { PersonStanding } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="loading-container">
      <span className="loading-letter">C</span>
      <PersonStanding className="text-green-300" size={50}></PersonStanding>
      <span className="loading-letter u">U</span>
    </div>
  );
}
