import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Attendee, Event } from "../types";
import { useEventContext } from "../context/useEventContext";

type EventFormData = Omit<Event, "id" | "attendees"> & {
  attendeeEmail: string;
};

export default function EventForm({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const { state, addEvent, updateEvent } = useEventContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    attendeeEmail: "",
  });

  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    if (isEditing && id) {
      const eventToEdit = state.events.find((event) => event.id === id);

      if (eventToEdit) {
        setFormData({
          title: eventToEdit.title,
          description: eventToEdit.description,
          date: eventToEdit.date.split(" ")[0],
          time: eventToEdit.time,
          location: eventToEdit.location,
          attendeeEmail: "",
        });

        setAttendees([...eventToEdit.attendees]);
      }
    }
  }, [isEditing, id, state.events]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      attendees: attendees,
    };

    if (isEditing && id) {
      updateEvent({ id, ...eventData });
    } else {
      addEvent(eventData);
    }

    navigate("/");
  }

  function handleAddAttendee() {
    const email = formData.attendeeEmail;

    if (attendees.some((a) => a.email === email)) return;

    setAttendees((prev) => [...prev, { email, status: "Yes" }]);
    setFormData((prev) => ({ ...prev, attendeeEmail: "" }));
  }

  function handleRemoveAttendee(email: string) {
    setAttendees((prev) => prev.filter((attendee) => attendee.email !== email));
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <section className="border border-secondary rounded-sm p-4 flex flex-col gap-6 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 *:flex *:flex-col *:gap-2"
      >
        <div>
          <label className="text-lg text-white font-bold" htmlFor="title">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            placeholder="Summer BBQ Party"
            required
          />
        </div>

        <div>
          <label className="text-lg text-white font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            rows={4}
            placeholder="Join us for a fun summer BBQ..."
            required
          />
        </div>

        <div>
          <label className="text-lg text-white font-bold" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            required
          />
        </div>

        <div>
          <label className="text-lg text-white font-bold" htmlFor="time">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={handleInputChange}
            value={formData.time}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            required
          />
        </div>

        <div>
          <label className="text-lg text-white font-bold" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            placeholder="123 Main St, City"
            required
          />
        </div>

        <div>
          <label
            className="text-lg text-white font-bold"
            htmlFor="attendeeEmail"
          >
            Attendees
          </label>
          <input
            type="email"
            id="attendeeEmail"
            name="attendeeEmail"
            onChange={handleInputChange}
            value={formData.attendeeEmail}
            className="placeholder:text-gray-400 p-2 outline-none text-white border-b border-l border-secondary rounded-b-sm"
            placeholder="email@example.com"
          />

          <button
            type="button"
            onClick={handleAddAttendee}
            className="bg-secondary px-4 py-2 rounded-sm text-primary flex justify-center items-center gap-x-4 mt-2"
          >
            <Plus className="size-5" />
            Add Attendee
          </button>

          {attendees.length > 0 && (
            <div className="space-y-4 mt-4 text-white">
              <p className="font-bold">Added attendees:</p>
              <ul className="space-y-2 text-wrap">
                {attendees.map((attendee, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-x-2 border border-secondary p-2 rounded-sm"
                  >
                    <span className="text-white break-all">
                      {attendee.email}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(attendee.email)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="size-5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-sm text-white border border-secondary flex justify-center items-center gap-x-4 mt-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-secondary px-4 py-2 rounded-sm text-primary flex justify-center items-center gap-x-4 mt-2"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
