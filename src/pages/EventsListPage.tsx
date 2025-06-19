import EventCard from "../components/EventCard";
import { useEventContext } from "../context/useEventContext";

export default function EventsListPage() {
  const { state } = useEventContext();
  const { events } = state;

  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-5xl font-black text-secondary my-4">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-white">No events created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
