import {
    createRootRoute,
    createRoute,
    createRouter,
} from "@tanstack/react-router";

import GalleryApp from "./GalleryApp";
import Home from "./views/Home";
import UserList from "./views/UserList";
import MyProfileRoute from "./routes/MyProfileRoute";
import UserProfileRoute from "./routes/UserProfileRoute";
import GalleryRoute from "./routes/GalleryRoute";

const rootRoute = createRootRoute({
  component: GalleryApp,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UserList,
});

const myProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: MyProfileRoute,
});

const userProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/$userId",
  component: UserProfileRoute,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery/$galleryId",
  component: GalleryRoute,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  usersRoute,
  myProfileRoute,
  userProfileRoute,
  galleryRoute,
]);

// IMPORTANT: basepath must match where the app is mounted (e.g. /hackweek-frontend/)
const basepath =
  (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export const router = createRouter({
  routeTree,
  basepath,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}