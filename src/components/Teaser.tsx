import { storyblokEditable } from "@storyblok/react/rsc";
import { TeaserStoryblok } from "../../component-types-sb";

const Teaser = ({ blok }: { blok: TeaserStoryblok }) => {
  return <h2 {...storyblokEditable(blok)}>{blok.headline}</h2>;
};

export default Teaser;
