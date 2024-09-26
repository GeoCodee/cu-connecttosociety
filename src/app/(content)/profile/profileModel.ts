export const fetchUserInfo = async () => {
  try {
    const fetchCurrentUser = await fetch(`/api/get-userInfo`);

    if (!fetchCurrentUser.ok) {
      throw new Error(`Can't fetch user details`);
    }

    const user = await fetchCurrentUser.json();
    console.log(`data: ${user.userInfo.firstName}`);

    return user;
  } catch (error) {
    throw new Error(`Can't fetch user details`);
  }
};

export const checkUserInfo = async () => {
  try {
    const checkInfo = await fetch(
      `/api/functions/profileFunctions/getProfileInfoById`
    );

    const userDetails = await checkInfo.json();
    console.log(`data: ${userDetails}`);

    return userDetails.result;
  } catch (error) {
    throw new Error(`Can't check user details`);
  }
};

export interface ProfileModel {
  userId: string;
  name: string;
  description: string;
  interest_tags: string[];
}

export const eventTags = [
  {
    label: "Sports",
    color: "text-blue-400",
  },
  {
    label: "Video Games",
    color: "text-purple-400",
  },
  {
    label: "DIY",
    color: "text-green-400",
  },
  {
    label: "Music",
    color: "text-yellow-400",
  },
  {
    label: "Movies",
    color: "text-red-400",
  },
  {
    label: "Technology",
    color: "text-indigo-400",
  },
  {
    label: "Travel",
    color: "text-teal-400",
  },
  {
    label: "Cooking",
    color: "text-orange-400",
  },
  {
    label: "Fitness",
    color: "text-pink-400",
  },
  {
    label: "Art",
    color: "text-amber-400",
  },
  {
    label: "Photography",
    color: "text-cyan-400",
  },
  {
    label: "Books",
    color: "text-lime-400",
  },
  {
    label: "Fashion",
    color: "text-rose-400",
  },
  {
    label: "Health",
    color: "text-green-500",
  },
  {
    label: "Education",
    color: "text-blue-500",
  },
];
