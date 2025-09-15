import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";
import Header from "~/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "budgeting App" },
    { name: "description", content: "Welcome to budgeting App!" },
  ];
}

export default function Home() {
  return (
    <>
      <Welcome />
    </>
  );
}
