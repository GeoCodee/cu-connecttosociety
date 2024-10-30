'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { ProfileModel, checkUserInfo } from "./profileModel"
import { Badge } from "@/components/ui/badge"
import CreateOrEditProfile from "@/components/component/profile/createOrEditProfile"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { FaEdit } from "react-icons/fa"

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<ProfileModel | null>(null)

  const getUserInfo = async () => {
    const userInfo = await checkUserInfo()
    if (!userInfo || !isProfileComplete(userInfo)) {
      setIsEditing(true)
    } else {
      setProfile(userInfo)
    }
    setIsLoading(false)
  }

  const isProfileComplete = (profile: ProfileModel): boolean => {
    return !!(
      profile.name &&
      profile.description &&
      profile.interest_tags &&
      profile.interest_tags.length > 0
    )
  }

  const editMode = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1729]">
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-4xl mx-auto shadow-lg bg-white">
            <CardHeader className="p-8 pb-0">
              <div className="flex justify-between items-center mb-6">
                <Skeleton className="w-32 h-32 rounded-full" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardHeader>
            <CardContent className="p-8">
              <Skeleton className="h-6 w-1/4 mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-24" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return <CreateOrEditProfile setIsEditing={setIsEditing} />
  }

  return (
    <div className="min-h-screen bg-[#0f1729]">
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto shadow-xl border-green-500 border-t-4 bg-white">
          <CardHeader className="p-8 pb-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-6">
                <Avatar className="w-32 h-32 border-4 border-green-500 shadow-lg">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback className="bg-green-500 text-white text-4xl font-bold">
                    {profile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{profile?.name}</h2>
                  <p className="text-lg text-gray-600">{profile?.description}</p>
                </div>
              </div>
              <Button
                onClick={editMode}
                variant="outline"
                className="flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 border-none shadow transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                <FaEdit /> Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Interests & Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile?.interest_tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 border border-green-300 rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}