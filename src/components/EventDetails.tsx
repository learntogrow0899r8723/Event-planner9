import { Calendar, Clock, Edit, MapPin, Trash2, Users, X } from "lucide-react";
import { Attendee, Event } from "../types";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEventContext } from "../context/useEventContext";

export default function EventDetails({ event }: { event: Event }) {
  const [newAttendee, setNewAttendee] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDuplicateError, setShowDuplicateError] = useState(false);
  const navigate = useNavigate();

  const { addAttendee, deleteEvent, updateAttendeeStatus } = useEventContext();

  const { id, title, description, date, time, location, attendees } = event;
  const confirmedAttendees = attendees.filter(
    (attendee) => attendee.status === "Yes"
  ).length;

  function handleAddAttendee() {
    const attendeeExists = attendees.some((a) => a.email === newAttendee);
    if (attendeeExists) {
      setShowDuplicateError(true);
      setTimeout(() => {
        setShowDuplicateError(false);
      }, 3000);
    }

    addAttendee(event.id, newAttendee);
    setNewAttendee("");
  }

  function handleEventEdit() {
    navigate(`/edit/${id}`);
  }

  function handleDeleteEvent() {
    deleteEvent(id);
    navigate("/");
  }

  function handleChangeStatus(email: string, status: Attendee["status"]) {
    updateAttendeeStatus(id, email, status);
  }

  return (
    <>
      <div className="border border-secondary rounded-sm p-6 flex flex-col gap-6 max-w-3xl">
        <div className="flex flex-col-reverse gap-4">
          <h2 className="text-3xl font-bold text-secondary capitalize">
            {title}
          </h2>

          <div className="self-end space-x-4 *:text-secondary">
            <button onClick={handleEventEdit}>
              <Edit className="size-6" />
            </button>
            <button onClick={() => setShowDeleteConfirm(true)}>
              <Trash2 className="size-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 *:flex *:gap-2 *:text-white *:text-lg">
          <p>
            <Calendar className="text-secondary" /> {date}
          </p>

          <p>
            <Clock className="text-secondary" /> {time}
          </p>

          <p>
            <MapPin className="text-secondary" /> {location}
          </p>

          <p>
            <Users className="text-secondary" />
            {confirmedAttendees === 1
              ? "1 Confirmed Attendee"
              : `${confirmedAttendees} Confirmed Attendees`}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-secondary font-bold">Description</h2>
          <p className="text-white">{description}</p>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-xl text-secondary font-bold">Attendees</h2>

          <div className="flex flex-col gap-4 max-w-md">
            <input
              type="email"
              value={newAttendee}
              onChange={(e) => setNewAttendee(e.target.value)}
              className="border border-secondary rounded-sm placeholder:text-gray-400 p-2 outline-none text-white"
              placeholder="Add attendee email"
            />
            <button
              onClick={handleAddAttendee}
              className="bg-secondary px-4 py-2 rounded-sm text-primary"
            >
              Add Attendee
            </button>
            {showDuplicateError && (
              <p className="text-red-400 text-lg">
                This email is already in the attendee list.
              </p>
            )}
          </div>
        </div>

        {attendees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-separate border-spacing-x-6 md:border-spacing-x-12 -ml-4 md:-ml-12">
              <thead>
                <tr>
                  <th className="py-3 text-left text-white">EMAIL</th>
                  <th className="py-3 text-left text-white">STATUS</th>
                  <th className="py-3 text-left text-white">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={index} className="*:py-4">
                    <td className="text-white md:text-lg">{attendee.email}</td>
                    <td>
                      <span
                        className={`px-2 py-1 text-sm font-bold rounded-full text-white ${
                          attendee.status === "Yes"
                            ? "bg-green-700"
                            : attendee.status === "No"
                            ? "bg-red-700"
                            : "bg-yellow-700"
                        }`}
                      >
                        {attendee.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-4 *:text-white *:px-2 *:py-1 *:text-shadow-amber-50 *:font-medium *:rounded-sm">
                        <button
                          onClick={() =>
                            handleChangeStatus(attendee.email, "Yes")
                          }
                          className={`${
                            attendee.status === "Yes"
                              ? "bg-green-700 "
                              : "bg-gray-700 hover:bg-green-700"
                          } transition-colors`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            handleChangeStatus(attendee.email, "No")
                          }
                          className={`${
                            attendee.status === "No"
                              ? "bg-red-700"
                              : "bg-gray-700 hover:bg-red-700"
                          } transition-colors`}
                        >
                          No
                        </button>
                        <button
                          onClick={() =>
                            handleChangeStatus(attendee.email, "Maybe")
                          }
                          className={`${
                            attendee.status === "Maybe"
                              ? "bg-yellow-700"
                              : "bg-gray-700  hover:bg-yellow-700"
                          } transition-colors`}
                        >
                          Maybe
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white italic">No Attendees Added Yet.</p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed flex items-center justify-center p-4 z-50 inset-0">
          <div className="bg-primary rounded-sm p-6 flex flex-col gap-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold text-white">Delete Event</h3>

              <button
                className="text-primary rounded-full p-1 bg-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-white text-lg">
              Are you sure you want to delete this event? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 *:px-4 *:py-2 *:rounded-sm">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-secondary text-primary"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="bg-tertiary text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
