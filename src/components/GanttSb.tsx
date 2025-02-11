import { storyblokEditable } from "@storyblok/react/rsc";
import { GanttStoryblok } from "../../component-types-sb";
import { GanttWrapper } from "./GanttWrapper";

const GanttSb = ({ blok }: { blok: GanttStoryblok }) => {
  console.log("GanttSb ", { blok });
  return (
    <div {...storyblokEditable(blok)} style={{ flex: 1 }}>
      <div>{blok.name}</div>
      <GanttWrapper tasks={blok.tasks[0].task} />
    </div>
  );
};

export default GanttSb;
