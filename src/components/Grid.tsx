import { StoryblokComponent, storyblokEditable } from "@storyblok/react/rsc";
import { GridStoryblok } from "../../component-types-sb";

const Grid = ({ blok }: { blok: GridStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} style={{ display: "flex" }}>
      {blok.columns?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};

export default Grid;
