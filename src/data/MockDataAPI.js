import { Text } from "react-native";
import React, { Component } from "react";
import { recipes, categories, ingredients } from "./dataArrays";

// done
export function getCategoryById(categoriesStore, categoryId) {
  let category;
  categoriesStore.map((data) => {
    if (data.categoryId == categoryId) {
      category = data;
    }
  });
  return category;
}

// done
export function getIngredientName(ingredientID) {
  let name;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}
// zustand
export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map((data) => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}
// zustand
export function getCategoryName(categoryId) {
  let name;
  categories.map((data) => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

// done
export function getRecipes(categoryId) {
  const recipesArray = [];
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}

// modifica
// done
export function getRecipesByIngredient(ingredientId) {
  const recipesArray = [];
  recipes.map((data) => {
    data.ingredients.map((index) => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}
// zustand
export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map((data) => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}
// zustand
export function getAllIngredients(idArray) {
  const ingredientsArray = [];
  idArray.map((index) => {
    ingredients.map((data) => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

// functions for search
// zustand
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];
  ingredients.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}
// zustand
export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map((data) => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id); // return a vector of recipes
      recipes.map((item) => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}
// zustand
export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map((data) => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}
