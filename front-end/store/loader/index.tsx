import { create } from "zustand";

type StoreProps = {
  loader: boolean;
  timerID: ReturnType<typeof setTimeout> | null;
  activeLoader: () => void;
  desactiveLoader: () => void;
  oneSecondLoader: () => void;
};

export const useLoaderStore = create<StoreProps>((set, get) => ({
  loader: false,
  timerID: null,

  activeLoader: () => set({ loader: true }),
  
  desactiveLoader: () => set({ loader: false }),
  
  oneSecondLoader: () => {
    const currentTimerID = get().timerID;
    if (currentTimerID) clearTimeout(currentTimerID);

    set({ loader: true });

    const newTimerID = setTimeout(() => {
      set({ loader: false, timerID: null });
    }, 1000);

    set({ timerID: newTimerID });
  },
}));
