"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

interface SearchProps {
  searchEvents: (tag: string) => void;
}

function Search({ searchEvents }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function search(e) {
    e.preventDefault();
    const tag = e.target[0].value;

    // Create a new URLSearchParams object based on the current search params
    const params = new URLSearchParams(searchParams.toString());

    // Append or update the tag parameter
    params.set("tag", tag);

    // Update the URL with the new search parameters without reloading the page
    router.push(`?${params.toString()}`, { shallow: true });
    searchEvents(tag);
  }

  return (
    <div>
      <form onSubmit={search}>
        <input
          type="text"
          className="py-5 px-2 border black"
          placeholder="Enter tag"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;
