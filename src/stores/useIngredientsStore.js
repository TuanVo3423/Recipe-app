import { create } from "zustand";

const useIngredientsStore = create((set, get) => ({
  ingredientsStore: undefined,
  ingredientsArray: undefined,
  ingredientById: undefined,
  setIngredientsStore: (ingredients) => set({ ingredientsStore: ingredients }),
  getIngredientsStoreById: (idArray) => {
    const ingredientsArray = [];
    const ingredientsStoreBase = get().ingredientsStore;
    idArray.map((index) => {
      ingredientsStoreBase.map((data) => {
        if (data.ingredientId == index[0]) {
          ingredientsArray.push([data, index[1]]);
        }
      });
    });
    set({ ingredientsArray: ingredientsArray });
  },
  getIngredientById: (id) => {
    const ingredientsStoreBase = get().ingredientsStore;
    let flag;
    ingredientsStoreBase.map((data) => {
      if (data.ingredientId == id) {
        flag = data;
      }
    });
    set({ ingredientById: flag });
    return flag;
  },
}));

export default useIngredientsStore;
