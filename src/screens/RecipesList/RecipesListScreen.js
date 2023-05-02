import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getRecipeByCategoryId } from "../../api/getRecipes";
import useCategoriesStore from "../../stores/useCategoriesStore";

export default function RecipesListScreen(props) {
  const { navigation, route } = props;
  const getCategoryById = useCategoriesStore((state) => state.getCategoryById);
  const {
    data: recipeListData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recipesList"],
    queryFn: async () =>
      getRecipeByCategoryId(route?.params?.category.categoryId).then((res) => {
        return res.recipe;
      }),
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => {
    console.log("item: ", item);
    const { name } = getCategoryById(item.categoryId);
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

  return (
    <View>
      {!recipeListData ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipeListData}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      )}
    </View>
  );
}
