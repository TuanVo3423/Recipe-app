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
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import getCategories from "../../api/getCategories";
import getRecipes from "../../api/getRecipes";
import axios from "axios";
import useGetRecipesStore from "../../stores/useGetRecipesStore";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Box, Stack } from "native-base";
import useGetAuthStore from "../../stores/useGetAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen(props) {
  const { navigation } = props;
  const recipesStore = useGetRecipesStore((state) => state.recipes);
  const setRecipesStore = useGetRecipesStore((state) => state.setRecipesStore);
  const authStore = useGetAuthStore((state) => state.authStore);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () =>
      getRecipes().then((res) => {
        setRecipesStore(res.Recipes);
        return res.Recipes;
      }),

    // queryFn: async () => {
    //   getRecipes().then((data) => {
    //     setRecipesStore(data.Recipes);
    //   });
    //   // .catch();
    // },
    // onSuccess: () => {
    //   console.log("data : ", data);
    //   setRecipesStore(data.Recipes);
    // },
    // onError: () => {
    //   console.log(error);
    // },
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

  const renderRecipes = ({ item }) => (
    <TouchableOpacity onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableOpacity>
  );
  if (isLoading) {
    return (
      <ImageBackground source="../../../assets/adaptive-icon.png"></ImageBackground>
    );
  } else {
    return (
      <View>
        {recipesStore && (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={recipesStore}
            renderItem={renderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        )}
      </View>
    );
  }
}
