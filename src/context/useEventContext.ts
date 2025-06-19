import { createContext, useContext } from "react";
import { EventContextType } from "../types";

export const EventContext = createContext<EventContextType | undefined>(
  undefined
);

export function useEventContext() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEventContext must be within an EventProvider");
  }
  return context;
}
