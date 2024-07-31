"use client";
import { createContext, useState } from "react";

export const StoryDataContext = createContext(null);

export default function StoryDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storyData, setStoryData] = useState(null);
  return (
    <StoryDataContext.Provider
      value={{
        storyData,
        setStoryData,
      }}
    >
      {children}
    </StoryDataContext.Provider>
  );
}
