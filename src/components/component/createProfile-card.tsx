import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function CreateProfile() {
  const [isBuildingFinished, setIsBuildingFinished] = useState(false);

  function buildProfile() {
    setIsBuildingFinished(true);
  }

  if (isBuildingFinished) {
    return <div>Complete...</div>;
  }

  return (
    <div className="flex justify-center">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-2">
            Tell us a little about yourself and we will help you connect to
            events/activities in your interests
          </div>
          <div className="py-2">
            <Button onClick={buildProfile} className="bg-green-500 w-full">
              Create Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
