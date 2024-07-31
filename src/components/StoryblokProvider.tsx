/** 1. Tag it as a client component */
"use client";
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

import Feature from "./Feature";
import Grid from "./Grid";
import Page from "./Page";
import Teaser from "./Teaser";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  gantt: GanttSb,
};

/** 2. Initialize it as usual */
// reinitializing the Storyblok connection here again as we need to have it on the client as well.
//  The initialization inside the layout file will help us to fetch the data from Storyblok
storyblokInit({
  accessToken: process.env.storyblokApiToken,
  use: [apiPlugin],
  components,
});

import { ReactNode } from "react";
import GanttSb from "./GanttSb";

export default function StoryblokProvider({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
