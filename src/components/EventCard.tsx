import { Link } from "react-router-dom";
import { Event } from "../types";
import { Calendar, Clock, MapPin, User } from "lucide-react";

export default function EventCard({ event }: { event: Event }) {
  const {
    id,
    title,
    description,
    date,
    time,
    location,
    attendees = [],
  } = event;

  const confirmedAttendees = attendees.filter(
    (attendee) => attendee.status === "Yes"
  ).length;

  return (
    <Link
      to={`/event/${id}`}
      className="border-secondary border shadow-sm shadow-secondary hover:shadow-none duration-200 p-6 grid grid-rows-[min-content_min-content_1fr] gap-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-secondary capitalize">
          {title}
        </h2>
        <p className="text-white line-clamp-3"> {description}</p>
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
          <User className="text-secondary" />
          {confirmedAttendees === 1
            ? "1 Confirmed Attendee"
            : `${confirmedAttendees} Confirmed Attendees`}
        </p>
      </div>

      {attendees.length > 0 && (
        <div className="flex flex-col gap-1 bg-primary/80 rounded-sm p-6 self-end">
          <h3 className="text-xl text-secondary mb-2">Attendees: </h3>
          {attendees.slice(0, 3).map((attendee, index) => (
            <p key={index} className="flex gap-2 items-center flex-wrap">
              <span
                className={`size-3 rounded-full ${
                  attendee.status === "Yes"
                    ? "bg-green-400"
                    : attendee.status === "No"
                    ? "bg-red-400"
                    : "bg-yellow-400"
                }`}
              ></span>
              <span className="text-lg text-white wrap-anywhere">
                {attendee.email}
              </span>
            </p>
          ))}

          {attendees.length > 3 && (
            <span className=" text-secondary">
              +{attendees.length - 3} more
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
