export async function GET() {
  try {
    const res = await fetch(
      `https://mapi.storyblok.com/v1/spaces/${process.env.STORYBLOK_GANTT_SPACE_ID}/stories/${process.env.STORYBLOK_GANTT_STORY_ID}`,
      {
        headers: {
          Authorization: process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // const storyblokApi = getStoryblokApi();
    // let sbParams: ISbStoriesParams = { version: "draft" };

    // const data = await storyblokApi.get(
    //   `/v2/cdn/datasources?token=${process.env.STORYBLOK_API_TOKEN}`,
    //   sbParams,
    //   {
    //     cache: "no-store", // This prevents Next.js 13, 14 default caching behaviour
    //   }
    // );

    return Response.json(data);
  } catch (error) {
    console.error("Loading employees data failed", error);
    return new Response("Loading employees data failed", {
      status: 500,
    });
  }
}
