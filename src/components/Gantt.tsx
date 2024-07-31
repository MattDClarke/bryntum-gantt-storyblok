"use client";

import { StoryDataContext } from "@/contexts/StoryData.context";
import { debounce } from "@/utils";
import { DependencyModel, TaskModel } from "@bryntum/gantt";
import { BryntumGantt } from "@bryntum/gantt-react";
import { useContext, useEffect, useRef, useState } from "react";

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
  const { storyData, setStoryData } = useContext(StoryDataContext);
  console.log({ storyData });
  // storyData.content.body[1].tasks;
  const { tasks, ...props } = allProps;
  const [tasksState, setTasksState] = useState(
    storyData?.content?.body[1].tasks
  );

  const ganttRef = useRef<BryntumGantt>(null);
  // onDataChange({ source, project, store, action, record, records, changes }) {

  const debouncedFetch = debounce((updatedStory) => {
    fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStory),
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(tasksState) !== JSON.stringify(data)) {
          setStoryData(data.story);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, 200);

  const syncData = async ({ store, action, records }: SyncData) => {
    console.log({ store, action, records });
    const storeId = store.id;
    if (storeId === "tasks") {
      if (action === "add") {
        for (let i = 0; i < records.length; i++) {
          const storyDataState = { ...storyData };
          const content = storyDataState.content;
          const updatedContent = content.body.map((item) => {
            if (item.component === "gantt") {
              item.tasks = [
                ...item.tasks,
                {
                  id: records[i].data.id,
                  _uid: records[i].data.id,
                  name: records[i].data.name,
                  endDate: records[i].data.endDate,
                  startDate: records[i].data.startDate,
                  percentDone: records[i].data.percentDone,
                  manuallyScheduled: true,
                  _editable: `<!--#storyblok#{"name": "task", "space": "298751", "uid": "${records[i].data.id}", "id": "529065290"}-->`,
                  component: "task",
                },
              ];
            }
            return item;
          });
          const updatedStory = {
            story: {
              ...storyData,
              content: {
                ...storyData.content,
                body: updatedContent,
              },
            },
          };
          console.log({ storyData, updatedStory });
          setStoryData(updatedStory.story);
        }
      }
      if (action === "remove") {
        for (let i = 0; i < records.length; i++) {
          const storyDataState = { ...storyData };
          const content = storyDataState.content;
          const updatedContent = content.body.map((item) => {
            if (item.component === "gantt") {
              item.tasks = item.tasks
                .map((task) => {
                  if (task.id === records[i].data.id) {
                    const dataToSend = {
                      id: records[i].data.id,
                      _uid: records[i].data._uid,
                      name: records[i].data.name,
                      endDate: records[i].data.endDate,
                      component: records[i].data.component,
                      startDate: records[i].data.startDate,
                      percentDone: records[i].data.percentDone,
                      manuallyScheduled: true,
                      _editable: `<!--#storyblok#{"name": "task", "space": "298751", "uid": "${records[i].data.id}", "id": "529065290"}-->`,
                    };
                    return dataToSend;
                  }
                  return task;
                })
                .filter((task) => task.id !== records[i].data.id);
            }
            return item;
          });
          const updatedStory = {
            story: {
              ...storyData,
              content: {
                ...storyData.content,
                body: updatedContent,
              },
            },
          };
          setStoryData(updatedStory.story);
        }
      }
      if (action === "update") {
        for (let i = 0; i < records.length; i++) {
          const storyDataState = { ...storyData };
          const content = storyDataState.content;
          // 1. find content.body array item object where component prop  === "gantt".
          // 2. in the array item, tasks[0] array, find the object with _uid === id.
          // 3. replace the object with records[i].data
          // const storyId = story.data.story.id;
          const updatedContent = content.body.map((item) => {
            if (item.component === "gantt") {
              item.tasks = item.tasks.map((task) => {
                if (task.id === records[i].data.id) {
                  const dataToSend = {
                    id: records[i].data.id,
                    _uid: records[i].data._uid,
                    name: records[i].data.name,
                    endDate: records[i].data.endDate,
                    component: records[i].data.component,
                    startDate: records[i].data.startDate,
                    percentDone: records[i].data.percentDone,
                    manuallyScheduled: true,
                  };
                  return dataToSend;
                }
                return task;
              });
            }
            return item;
          });
          const updatedStory = {
            story: {
              ...storyData,
              content: {
                ...storyData.content,
                body: updatedContent,
              },
            },
          };
          if (updatedStory.story.content) debouncedFetch(updatedStory);
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
