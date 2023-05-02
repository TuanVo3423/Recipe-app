import { create } from "zustand";

const useCategoriesStore = create((set, get) => ({
  categoriesStore: [],
  setCategoriesStore: (categories) => set({ categoriesStore: categories }),
  getCategoryById: (id) => {
    let flag;
    const categoriesStoreBase = get().categoriesStore;
    categoriesStoreBase.map((data) => {
      if (data.categoryId == id) {
        flag = data;
      }
    });
    return flag;
  },
}));

export default useCategoriesStore;
