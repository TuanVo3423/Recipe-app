import { create } from "zustand";

const useGetAuthStore = create((set, get) => ({
  authStore: undefined,
  setAuthStore: (auth) => set({ auth }),
}));

export default useGetAuthStore;
