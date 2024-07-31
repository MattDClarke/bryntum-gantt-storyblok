"use client";

import { fetchData } from "@/helpers";
import { DependencyModel, TaskModel } from "@bryntum/gantt";
import { BryntumGantt } from "@bryntum/gantt-react";
import { useEffect, useRef, useState } from "react";

type SyncData = {
  action: "dataset" | "add" | "remove" | "update";
  records: {
    data: TaskModel | DependencyModel;
    meta: {
      modified: Partial<TaskModel> | Partial<DependencyModel>;
    };
  }[];
  store: {
    id: "tasks" | "dependencies";
  };
};

export default function Gantt({ ...allProps }) {
  const { tasks, ...props } = allProps;
  const [tasksState, setTasksState] = useState(tasks);
  // console.log("/////", { story });
  console.log({ tasks });

  const ganttRef = useRef<BryntumGantt>(null);
  // onDataChange({ source, project, store, action, record, records, changes }) {

  const syncData = async ({ store, action, records }: SyncData) => {
    console.log({ store, action, records });
    const storeId = store.id;
    if (storeId === "tasks") {
      if (action === "add") {
        // const { tasks } = data;
      }
      if (action === "remove") {
      }
      if (action === "update") {
        for (let i = 0; i < records.length; i++) {
          const id = records[i].data.id;
          if (`id`.startsWith("_generated")) return;
          // const modifiedVariables = records[i].meta
          //   .modified as Partial<TaskModel>;
          console.log(records[i].data);
          const story = await fetchData();
          console.log(story);
          const content = story.data.story.content;
          // 1. find content.body array item object where component prop  === "gantt".
          // 2. in the array item, tasks[0].task array, find the object with _uid === id.
          // 3. replace the object with records[i].data
          // const storyId = story.data.story.id;
          const updatedContent = content.body.map((item) => {
            if (item.component === "gantt") {
              item.tasks[0].task = item.tasks[0].task.map((task) => {
                if (task._uid === records[i].data._uid) {
                  return records[i].data;
                }
                return task;
              });
            }
            return item;
          });
          const updatedStory = {
            story: {
              ...story.data.story,
              content: {
                ...story.data.story.content,
                body: updatedContent,
              },
            },
          };

          // Send the updated story data back to StoryBlok
          // const storyblokApi = getStoryblokApi();
          // const updateResponse = await storyblokApi.put(
          //   `cdn/stories/${story.data.story.id}`,
          //   { version: "draft", story: updatedStory.story }
          // );
          // console.log("Story updated successfully:", { updateResponse });
          fetch("/api/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStory),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
              if (JSON.stringify(tasksState) !== JSON.stringify(data)) {
                setTasksState(data);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          // return storyblokApi.post(`cdn/stories/home`, sbParams, {
          //   cache: "no-store",
          // });
          // (Object.keys(modifiedVariables) as Array<keyof Resources>).forEach(
          //   (key) => {
          //     modifiedVariables[key] = (records[i].data as Resources)[
          //       key
          //     ] as any;
          //   }
          // );
          // updateResource({
          //   variables: { ...modifiedVariables, id: records[i].data.id },
          // });
        }
      }
    }

    if (storeId === "dependencies") {
      if (action === "remove") {
      }
      if (action === "update") {
      }
    }
  };

  useEffect(() => {
    // Bryntum Gantt instance
    const gantt = ganttRef?.current?.instance;
  }, []);

  return (
    <BryntumGantt
      {...props}
      ref={ganttRef}
      tasks={tasksState}
      onDataChange={syncData}
    />
  );
}
