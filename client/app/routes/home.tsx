import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";
import AppLayout from "~/components/AppLayout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "budgeting App" },
    { name: "description", content: "Welcome to budgeting App!" },
  ];
}

export default function Home() {
  return (
    <AppLayout title={"Welcome to Personal Organizer App"}>
      <div className="flex m-auto text-center">
        All your personal organization items here.
      </div>
    </AppLayout>
  );
}
