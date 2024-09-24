"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ProfileModel, checkUserInfo, fetchUserInfo } from "./profileModel";
import { useAuth } from "@clerk/nextjs"; // Use useAuth instead of auth
import { Badge } from "@/components/ui/badge";
import CreateProfile from "@/components/component/createProfile-card";
import { SkeletonLoading } from "@/components/SkeletonLoading";
import { Button } from "@/components/ui/button";
import ProfileWithAvatar from "@/components/component/profile/profileWithAvatar";

export default function Profile() {
  const [userName, setUserName] = useState<string | null>(null); // State to hold user's full name
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<ProfileModel>();

  const getUserInfo = async () => {
    const userInfo = await checkUserInfo();
    // Destructure to get properties directly

    setProfile(userInfo);
    setIsLoading(false);
    console.log(userInfo);
  };

  const editMode = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []); // Dependency array includes userId

  // if (isLoading) {
  //   return <CreateProfile></CreateProfile>;
  //   // Show a loading message while fetching data
  // }

  if (isLoading) {
    return <SkeletonLoading></SkeletonLoading>;
  }

  if (isEditing) {
    return <ProfileWithAvatar></ProfileWithAvatar>;
  }

  return (
    <div className="flex justify-center">
      <Card className="w-3/4 max-w-4xl mx-auto lg:w-1/2">
        <CardHeader className="p-8">
          <div className="flex">
            <div className="ml-auto">
              <Button className="text-right" onClick={editMode}>
                Edit
              </Button>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <h2 className="text-4xl font-bold mb-4">{profile?.name}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {profile?.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="flex flex-wrap justify-center gap-3">
            {profile?.interest_tags.map((tag, index) => (
              <Badge key={index} className="text-base px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

//Workflow
//check if user has a record in profile table
//- if not, show them CreateProfile, with a button
//if user has a record but not complete, show them EditProfile
//if user has a complete record, show page profile,
//with a button that allows the user to edit their profile, which goes to editProfile
