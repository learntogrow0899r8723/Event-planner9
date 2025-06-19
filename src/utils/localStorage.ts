import { Event, EventState } from "../types";

const STORAGE_KEY = "planner_events_1";

function loadEvents(): Event[] {
  const eventsJSON = localStorage.getItem(STORAGE_KEY);
  return eventsJSON ? JSON.parse(eventsJSON) : [];
}

export function saveEvents(events: Event[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getInitialState(): EventState {
  return {
    events: loadEvents(),
  };
}
