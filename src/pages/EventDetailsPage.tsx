import { useParams } from "react-router-dom";
import EventDetails from "../components/EventDetails";
import { useEventContext } from "../context/useEventContext";

export default function EventDetailsPage() {
  const { id } = useParams();
  const { state } = useEventContext();
  const event = state.events.find((event) => event.id === id)!;
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-5xl font-black text-secondary my-4">Event Details</h2>
      <EventDetails event={event} />
    </section>
  );
}
