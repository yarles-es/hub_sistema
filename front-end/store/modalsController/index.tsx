import { create } from "zustand";

type StoreProps = {
  modalUpdatePassword: boolean;
  setModalUpdatePassword: (value: boolean) => void;
};

export const useModalsStore = create<StoreProps>((set) => ({
  modalUpdatePassword: false,
  setModalUpdatePassword: (value) => set({ modalUpdatePassword: value }),
}));
