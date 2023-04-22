import { create } from "zustand";

const useIngredientsStore = create((set, get) => ({
  ingredientsStore: [],
  setIngredientsStore: (ingredients) => set({ ingredients }),
}));

export default useIngredientsStore;
