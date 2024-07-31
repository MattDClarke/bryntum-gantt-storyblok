import { storyblokEditable } from "@storyblok/react/rsc";
import { FeatureStoryblok } from "../../component-types-sb";

const Feature = ({ blok }: { blok: FeatureStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} style={{ flex: 1 }}>
      <div>{blok.name}</div>
      {/* <GanttWrapper /> */}
    </div>
  );
};

export default Feature;
