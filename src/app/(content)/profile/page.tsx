"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ProfileModel, checkUserInfo, fetchUserInfo } from "./profileModel";
import { useAuth } from "@clerk/nextjs"; // Use useAuth instead of auth
import { Badge } from "@/components/ui/badge";
import CreateProfile from "@/components/component/createProfile-card";
import { SkeletonLoading } from "@/components/SkeletonLoading";
import { Button } from "@/components/ui/button";
import ProfileWithAvatar from "@/components/component/profile/profileWithAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaEdit } from "react-icons/fa";
import CreateOrEditProfile from "@/components/component/profile/createOrEditProfile";

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
    return <CreateOrEditProfile />;
  }

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="p-8 pb-0">
          <div className="flex justify-between items-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
              <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              onClick={editMode}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </Button>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{profile?.name}</h2>
            <p className="text-lg text-muted-foreground">
              {profile?.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {profile?.interest_tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
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
