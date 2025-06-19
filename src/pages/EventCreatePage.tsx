import EventForm from "../components/EventForm";

export default function EventCreatePage() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-5xl font-black text-secondary my-4">
        Create New Event
      </h2>
      <EventForm />
    </section>
  );
}
