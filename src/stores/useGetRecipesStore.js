import { create } from "zustand";

const useGetRecipesStore = create((set, get) => ({
  recipesStore: [],
  setRecipesStore: (recipes) => set({ recipesStore: recipes }),
  getNumberOfRecipes: (categoryID) => {
    let count = 0;
    const recipeStoreBase = get().recipesStore;
    console.log("recipeStoreBase: ", recipeStoreBase);
    recipeStoreBase.map((data) => {
      if (data.categoryId == categoryID) {
        count++;
      }
    });
    return count;
  },
  // getRecipesByRecipeName: (recipeName) => {
  //   const nameUpper = recipeName.toUpperCase();
  //   const recipesArray = [];
  //   const recipeStoreBase = get().recipesStore;
  //   recipeStoreBase.map((data) => {
  //     if (data.title.toUpperCase().includes(nameUpper)) {
  //       recipesArray.push(data);
  //     }
  //   });
  //   return recipesArray;
  // },
  // getRecipesByCategoryName: (categoryName, categories) => {
  //   const nameUpper = categoryName.toUpperCase();
  //   const recipesArray = [];
  //   categories.map((data) => {
  //     if (data.name.toUpperCase().includes(nameUpper)) {
  //       const recipes = getRecipes(data.id); // return a vector of recipes
  //       recipes.map((item) => {
  //         recipesArray.push(item);
  //       });
  //     }
  //   });
  //   return recipesArray;
  // },
}));

export default useGetRecipesStore;
