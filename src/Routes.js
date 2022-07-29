import {Dashboard} from "./screens/Dashboard/index";

export default [
  {
    exact: true,
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    exact: true,
    path: "*",
    name: "dashboard",
    component: Dashboard,
  },
];
