export async function PUT(request) {
  const reqBody = await request.json();
  console.log({ reqBody });
  try {
    // const resStoryData = await fetch(
    //   `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_GANTT_SPACE_ID}/stories/${process.env.STORYBLOK_GANTT_STORY_ID}`,
    //   {
    //     headers: {
    //       Authorization: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const storyData = await resStoryData.json();
    // console.log({ storyData });
    // storyData.story.content.body[1].tasks[0].task[0].name =
    // ("Updated Task through Management API");
    const res = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_GANTT_SPACE_ID}/stories/${process.env.STORYBLOK_GANTT_STORY_ID}`,
      {
        method: "PUT",
        headers: {
          Authorization: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ story: reqBody.story }),
      }
    );
    const data = await res.json();

    return Response.json(data);
    // return Response.json(storyData.story.content.body[1].tasks[0].task);
  } catch (error) {
    console.error("Loading employees data failed", error);
    return new Response("Loading employees data failed", {
      status: 500,
    });
  }
}
