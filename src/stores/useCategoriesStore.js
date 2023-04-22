import { create } from "zustand";

const useCategoriesStore = create((set, get) => ({
  categoriesStore: [],
  setCategoriesStore: (categories) => set({ categories }),
}));

export default useCategoriesStore;
