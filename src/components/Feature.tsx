import { storyblokEditable } from "@storyblok/react/rsc";
import { FeatureStoryblok } from "../../component-types-sb";

const Feature = ({ blok }: { blok: FeatureStoryblok }) => {
  return (
    <div {...storyblokEditable(blok.content)} style={{ flex: 1 }}>
      <div>{blok.content.name}</div>
      {/* <GanttWrapper /> */}
    </div>
  );
};

export default Feature;
