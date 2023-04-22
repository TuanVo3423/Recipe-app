import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import styles from "./styles";
import {
  getIngredientUrl,
  getRecipesByIngredient,
  getCategoryName,
} from "../../data/MockDataAPI";
import { useQuery } from "@tanstack/react-query";
import { getRecipeByIngerdientId } from "../../api/getRecipes";

export default function IngredientScreen(props) {
  const { navigation, route } = props;

  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;
  console.log("Ingredient");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["ingredient"],
    queryFn: async () => {
      const ingredientId = route.params?.ingredient;
      const data = await getRecipeByIngerdientId(ingredientId);
      return data;
    },
    onSuccess: () => {
      console.log("data : ", data);
      // setRecipesStore(data.Recipes);
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const RenderRecipes = ({ item }) => (
    <TouchableOpacity
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <TouchableOpacity
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressRecipe(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View
        style={{
          borderBottomWidth: 0.4,
          marginBottom: 10,
          borderBottomColor: "grey",
        }}
      >
        <Image
          style={styles.photoIngredient}
          source={{ uri: "" + ingredientUrl }}
        />
      </View>
      <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={getRecipesByIngredient(ingredientId)}
          renderItem={RenderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      </View>
    </ScrollView>
  );
}
