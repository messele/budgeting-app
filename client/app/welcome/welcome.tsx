import AppLayout from "~/components/AppLayout";

export function Welcome() {
  return (
    <AppLayout title={"Welcome to Personal Organizer App"}>
      <div className="flex m-auto text-center">
        All your personal organization items here.
      </div>
    </AppLayout>
  );
}