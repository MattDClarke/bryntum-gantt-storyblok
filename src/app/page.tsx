import { fetchData } from "@/helpers";
import "@bryntum/gantt/gantt.stockholm.css";
import { StoryblokStory } from "@storyblok/react/rsc";

export default async function Home() {
  const { data } = await fetchData();
  console.log(">>>>>>>>>>>.", data.story.content);

  return (
    // <main>
    <StoryblokStory story={data.story} />
    // </main>
  );
}
