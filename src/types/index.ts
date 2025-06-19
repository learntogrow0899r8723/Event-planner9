export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: Attendee[];
}

export interface Attendee {
  email: string;
  status: "Yes" | "No" | "Maybe";
}

export interface EventState {
  events: Event[];
}

export type EventAction =
  | { type: "ADD_EVENT"; payload: Event }
  | { type: "ADD_ATTENDEE"; payload: { eventId: string; attendee: Attendee } }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "UPDATE_EVENT"; payload: Event }
  | {
      type: "UPDATE_ATTENDEE_STATUS";
      payload: { eventId: string; email: string; status: Attendee["status"] };
    };

export interface EventContextType {
  state: EventState;
  dispatch: React.Dispatch<EventAction>;
  addEvent: (event: Omit<Event, "id">) => void;
  addAttendee: (eventId: string, email: string) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (event: Event) => void;
  updateAttendeeStatus: (
    eventId: string,
    email: string,
    status: Attendee["status"]
  ) => void;
}
