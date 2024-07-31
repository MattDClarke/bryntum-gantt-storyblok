"use client";
import { StoryDataContext } from "@/contexts/StoryData.context";
import "@bryntum/gantt/gantt.stockholm.css";
import { StoryblokComponent, useStoryblok } from "@storyblok/react";
import { useContext, useEffect } from "react";

export default function Home() {
  const story = useStoryblok("/home", { version: "draft" });
  const { setStoryData } = useContext(StoryDataContext);
  useEffect(() => {
    setStoryData(story);
  }, [story, setStoryData]);

  if (!story || !story.content) {
    return <div>Loading...</div>;
  }

  return <StoryblokComponent blok={story.content} />;
}
