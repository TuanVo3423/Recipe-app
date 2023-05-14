import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ViewBase,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import getRecipes from "../../api/getRecipes";
import useGetRecipesStore from "../../stores/useGetRecipesStore";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Stack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getIngredients from "../../api/getIngredients";
import useIngredientsStore from "../../stores/useIngredientsStore";
import getCategories from "../../api/getCategories";
import Spinner from "react-native-loading-spinner-overlay";

export default function HomeScreen(props) {
  const { navigation } = props;
  const setRecipesStore = useGetRecipesStore((state) => state.setRecipesStore);
  const setIngredientsStore = useIngredientsStore(
    (state) => state.setIngredientsStore
  );
  const setCategoriesStore = useCategoriesStore(
    (state) => state.setCategoriesStore
  );
  const categorieyByID = useCategoriesStore((state) => state.getCategoryById);
  const {
    isLoading,
    isError,
    data: recipesData,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () =>
      getRecipes().then((res) => {
        setRecipesStore(res.Recipes);
        return res.Recipes;
      }),
  });

  const { isLoading: ingredientLoading, data: ingredientData } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () =>
      getIngredients().then((res) => {
        setIngredientsStore(res.ingredient);
        return res.ingredient;
      }),
  });

  const { isLoading: categoriesLoading, data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      getCategories().then((res) => {
        setCategoriesStore(res.categories);
        return res.categories;
      }),
  });

  useLayoutEffect(() => {
    let name;
    AsyncStorage.getItem("name").then(
      (value) => (name = value.charAt(0).toUpperCase())
    );
    console.log("name : ", name);
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => (
        <Stack>
          <Avatar
            bg="gray.500"
            mr={2}
            // alignSelf="center"

            size="sm"
            // source={{
            //   uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            // }}
          >
            {name}
          </Avatar>
        </Stack>
      ),
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => {
    const { name } = categorieyByID(item.categoryId);

    return (
      <TouchableOpacity onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (isLoading) {
    return <Spinner visible={isLoading} textContent={"Loading..."} />;
  } else {
    return (
      <View>
        {recipesData && (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={recipesData}
            renderItem={renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        )}
      </View>
    );
  }
}
