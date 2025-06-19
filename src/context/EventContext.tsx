import { useReducer } from "react";
import { Attendee, Event, EventContextType } from "../types";
import { eventReducer } from "../reducers/eventReducer";
import { getInitialState } from "../utils/localStorage";
import { EventContext } from "./useEventContext";

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(eventReducer, getInitialState());

  function addEvent(eventData: Omit<Event, "id">) {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
    };

    dispatch({ type: "ADD_EVENT", payload: newEvent });
  }

  function addAttendee(eventId: string, email: string) {
    const attendee: Attendee = {
      email,
      status: "Yes",
    };

    dispatch({
      type: "ADD_ATTENDEE",
      payload: { eventId, attendee },
    });
  }

  function deleteEvent(id: string) {
    dispatch({
      type: "DELETE_EVENT",
      payload: id,
    });
  }

  function updateEvent(event: Event) {
    dispatch({ type: "UPDATE_EVENT", payload: event });
  }

  function updateAttendeeStatus(
    eventId: string,
    email: string,
    status: Attendee["status"]
  ) {
    dispatch({
      type: "UPDATE_ATTENDEE_STATUS",
      payload: { eventId, email, status },
    });
  }

  const value: EventContextType = {
    state,
    dispatch,
    addEvent,
    addAttendee,
    deleteEvent,
    updateEvent,
    updateAttendeeStatus,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
