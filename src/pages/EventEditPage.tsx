import EventForm from "../components/EventForm";

export default function EventEditPage() {
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-5xl font-black text-secondary my-4">Edit Event</h1>
      <EventForm isEditing />
    </section>
  );
}
