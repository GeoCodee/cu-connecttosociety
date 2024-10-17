import { TAGS } from "@/utils/utilities";
import React, { useState } from "react";

interface Props {
  searchEvents: (tags: string[], tag?: string) => void;
  reset: () => Promise<void>;
}

export default function Search({ searchEvents, reset }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  function submitHandler(e) {
    e.preventDefault();
    if (selectedTags.length === 0 && searchValue === "") return;
    searchEvents(selectedTags, searchValue);
  }

  function resetTags() {
    reset();
    setSelectedTags([]);
    setSearchValue("");
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="flex space-x-4">
        <input
          className="p-2 border rounded-lg"
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="bg-slate-600 text-white px-3 py-2 rounded-lg">Search</button>
      </div>
      <ul className="flex space-x-4 flex-wrap max-w-xs text-nowrap justify-center items-center space-y-2 lg:flex-nowrap p-6 ">
        {TAGS.map((tag) => (
          <li
            key={tag}
            className={`cursor-pointer px-3 py-1 rounded-md ${
              selectedTags.includes(tag)
                ? "bg-green-300 text-black"
                : "bg-slate-400"
            } hover:translate-y-1 duration-100`}
            onClick={() => {
              if (selectedTags.includes(tag)) {
                setSelectedTags(selectedTags.filter((t) => t !== tag));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          >
            {tag}
          </li>
        ))}
      </ul>

      <button onClick={resetTags} type="button" className="bg-red-600 mx-4">
        Reset
      </button>
    </form>
  );
}
