"use client";

import { TAGS } from "@/utils/utilities";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  searchEvents: (tags: string[], tag?: string) => void;
  reset: () => Promise<void>;
}

export default function Search({ searchEvents, reset }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();

  // Submit handler for the search input
  function submitHandler(e) {
    e.preventDefault();
    if(searchValue !== "") {
      searchEvents("", searchValue);
    } else {
      return ;
    }

  }

  // Function to reset tags and search value
  async function resetTags(e) {
    e.preventDefault();
    router.push("/events");
    reset();
    setSelectedTags([]);
    setSearchValue("");
  }

  // Function to handle tag click and make an API call
  function handleTagClick(tag: string) {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag) // Remove tag if already selected
      : [...selectedTags, tag]; // Add tag if not selected

    setSelectedTags(updatedTags);

    const tagQuery = updatedTags.join(",");
    router.push(`/events?filter=${encodeURIComponent(tagQuery)}`);

    // Make API call with the updated tags
    searchEvents(updatedTags, searchValue);
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="flex justify-center items-center">
        <input
          className="p-2 rounded-l-full shadow-lg italic"
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="bg-white text-slate-600 p-2 rounded-r-full">
          Search
        </button>
      </div>
      <ul className="flex space-x-2 flex-wrap text-nowrap justify-center items-center space-y-2 lg:flex-nowrap p-6">
        {TAGS.map((tag) => (
          <li
            key={tag}
            className={`cursor-pointer px-3 py-1 rounded-md ${
              selectedTags.includes(tag)
                ? "bg-green-300 text-black"
                : "bg-slate-400"
            } hover:translate-y-1 duration-100`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </li>
        ))}
      </ul>
      <button
        onClick={(e) => resetTags(e)}
        type="button"
        className={`bg-red-600 px-5 rounded-full ${
          selectedTags.length === 0 ? "hidden" : "inline"
        }`}
      >
        Remove Tags
      </button>
    </form>
  );
}
