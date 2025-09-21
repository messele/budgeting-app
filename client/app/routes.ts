import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("budgets", "routes/budgets.tsx")
] satisfies RouteConfig;
