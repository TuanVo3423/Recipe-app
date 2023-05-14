import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import styles from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getRecipeByIngerdientId } from "../../api/getRecipes";
import useIngredientsStore from "../../stores/useIngredientsStore";
import useCategoriesStore from "../../stores/useCategoriesStore";
import Spinner from "react-native-loading-spinner-overlay";

export default function IngredientScreen(props) {
  const { navigation, route } = props;
  const getIngredientById = useIngredientsStore(
    (state) => state.getIngredientById
  );
  const getCategoryById = useCategoriesStore((state) => state.getCategoryById);

  const { photo_url } = getIngredientById(route.params?.ingredient);
  const ingredientName = route.params?.name;
  const {
    isLoading,
    isError,
    data: RecipeByIngerdientIdData,
    error,
  } = useQuery({
    queryKey: ["ingredient"],
    queryFn: async () => {
      const data = await getRecipeByIngerdientId(route.params?.ingredient);
      return data;
    },
  });
  console.log("RecipeByIngerdientIdData:", RecipeByIngerdientIdData);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const RenderRecipes = ({ item }) => {
    const { name } = getCategoryById(item.categoryId);
    return (
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
            <Text style={styles.category}>{name}</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
          source={{ uri: "" + photo_url }}
        />
      </View>
      <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
      <View>
        {isLoading ? (
          <Spinner visible={isLoading} />
        ) : (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={RecipeByIngerdientIdData.recipesArray}
            renderItem={RenderRecipes}
            keyExtractor={(item) => `${item.recipeId}`}
          />
        )}
      </View>
    </ScrollView>
  );
}
