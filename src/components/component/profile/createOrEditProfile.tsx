import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { eventTags } from "@/app/(content)/profile/profileModel"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser, FaPencilAlt, FaTags } from "react-icons/fa"

interface ProfileData {
  name: string
  description: string
  interestTags: string[]
  avatar_url?: string
}

interface CreateOrEditProfileProps {
  setIsEditing: (isEditing: boolean) => void
  existingProfile?: ProfileData
}

export default function CreateOrEditProfile({
  setIsEditing,
  existingProfile,
}: CreateOrEditProfileProps) {
  const [profile, setProfile] = useState<ProfileData>(
    existingProfile || {
      name: "",
      description: "",
      interestTags: [],
      avatar_url: "",
    }
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }))
  }

  const handleTagToggle = (tag: string) => {
    setProfile((prevProfile) => {
      const newTags = prevProfile.interestTags.includes(tag)
        ? prevProfile.interestTags.filter((t) => t !== tag)
        : [...prevProfile.interestTags, tag]
      return { ...prevProfile, interestTags: newTags }
    })
  }

  const handleAutoSelectTags = async () => {
    if (!profile.description) {
      alert("Please enter a description before auto-selecting tags.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("/api/generateTagsByDescription", {
        description: profile.description,
      })

      const aiSelectedTags = response.data
      setProfile((prevProfile) => ({
        ...prevProfile,
        interestTags: aiSelectedTags.filter((tag: string) =>
          eventTags.some((eventTag) => eventTag.label === tag)
        ),
      }))
    } catch (error) {
      console.error("Error auto-selecting tags:", error)
      alert("An error occurred while auto-selecting tags. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(
        "/api/functions/profileFunctions/editProfileDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      console.log("Profile updated successfully")
      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("An error occurred while updating your profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center p-4 bg-[#0f1729] min-h-screen">
      <Card className="w-full max-w-4xl shadow-xl border-green-500 border-t-4 bg-white">
        <CardHeader className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-24 h-24 border-4 border-green-500 shadow-lg">
              <AvatarImage src={profile.avatar_url} alt={profile.name} />
              <AvatarFallback className="bg-green-500 text-white text-3xl font-bold">
                <FaUser />
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl font-bold text-gray-800">
              {profile.name ? "Edit Profile" : "Create Profile"}
            </CardTitle>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaUser className="text-green-500" /> Name
              </label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaPencilAlt className="text-green-500" /> Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                rows={4}
                required
                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaTags className="text-green-500" /> Interests
                </label>
                <Button
                  type="button"
                  onClick={handleAutoSelectTags}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="bg-green-100 text-green-700 hover:bg-green-200 border-green-300"
                >
                  {isLoading ? "Processing..." : "Auto Select Tags With AI"}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {eventTags.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant={profile.interestTags.includes(tag.label) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${
                      profile.interestTags.includes(tag.label)
                        ? `${tag.color} text-white`
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleTagToggle(tag.label)}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading
                ? "Updating..."
                : profile.name
                ? "Update Profile"
                : "Create Profile"}
            </Button>
          </form>
        </CardHeader>
      </Card>
    </div>
  )
}