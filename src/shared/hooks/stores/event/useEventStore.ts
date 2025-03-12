import { create } from "zustand";

interface EventStore {
  eventList: Home.Event[];
  setEventList: (evetList: Home.Event[]) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  eventList: [],
  setEventList: (eventList) => set({ eventList }),
}));
