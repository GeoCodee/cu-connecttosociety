import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { eventTags } from "@/app/(content)/profile/profileModel";
import axios from "axios";

interface ProfileData {
  name: string;
  description: string;
  tags: string[];
}

const CreateOrEditProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    description: "",
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setProfile((prevProfile) => {
      const newTags = prevProfile.tags.includes(tag)
        ? prevProfile.tags.filter((t) => t !== tag)
        : [...prevProfile.tags, tag];
      return { ...prevProfile, tags: newTags };
    });
  };

  const handleAutoSelectTags = async () => {
    if (!profile.description) {
      alert("Please enter a description before auto-selecting tags.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "/api/functions/profileFunctions/generateTagsByDescription",
        {
          description: profile.description,
        }
      );

      const aiSelectedTags = response.data;
      setProfile((prevProfile) => ({
        ...prevProfile,
        tags: aiSelectedTags.filter((tag: string) =>
          eventTags.some((eventTag) => eventTag.label === tag)
        ),
      }));
    } catch (error) {
      console.error("Error auto-selecting tags:", error);
      alert("An error occurred while auto-selecting tags. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement profile submission logic
    console.log("Profile submitted:", profile);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>
          {profile.name ? "Edit Profile" : "Create Profile"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Interests</label>
              <Button
                type="button"
                onClick={handleAutoSelectTags}
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? "Processing..." : "Auto Select Tags With AI"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventTags.map((tag) => (
                <Badge
                  key={tag.label}
                  variant={
                    profile.tags.includes(tag.label) ? "default" : "outline"
                  }
                  className={`cursor-pointer ${
                    profile.tags.includes(tag.label) ? tag.color : ""
                  }`}
                  onClick={() => handleTagToggle(tag.label)}
                >
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            {profile.name ? "Update Profile" : "Create Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateOrEditProfile;
