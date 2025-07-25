import { create } from "zustand";

type StoreProps = {
  invalid: boolean;
  setInvalid: (invalid: boolean) => void;
};

export const useAuthStore = create<StoreProps>((set) => ({
  invalid: false,
  setInvalid: (invalid) => set({ invalid }),
}));
