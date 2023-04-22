import { create } from "zustand";

const useGetRecipesStore = create((set, get) => ({
  recipesStore: [],
  setRecipesStore: (recipes) => set({ recipes }),
}));

export default useGetRecipesStore;
