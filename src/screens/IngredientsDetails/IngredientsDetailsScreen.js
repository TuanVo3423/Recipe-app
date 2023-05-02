import React, { useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import useIngredientsStore from "../../stores/useIngredientsStore";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;
  const ingredientsArray = useIngredientsStore(
    (state) => state.ingredientsArray
  );
  const getIngredientsStoreById = useIngredientsStore(
    (state) => state.getIngredientsStoreById
  );
  const getIngredientById = useIngredientsStore(
    (state) => state.getIngredientById
  );

  useEffect(() => {
    getIngredientsStoreById(route.params?.ingredients);
  }, [route.params?.ingredients]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    const ingredientByID = getIngredientById(item.ingredientId);
    let ingredient = item.ingredientId;
    console.log("ingredientByID: ", ingredientByID, ingredient);
    navigation.navigate("Ingredient", {
      ingredient,
      name: ingredientByID.name,
    });
  };

  const RenderIngredient = ({ item }) => {
    console.log(item[0].ingredientId);
    return (
      <TouchableOpacity
        key={item[0].ingredientId}
        underlayColor="rgba(73,182,77,0.9)"
        onPress={() => onPressIngredient(item[0])}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
          <Text style={styles.title}>{item[0].name}</Text>
          <Text style={{ color: "grey" }}>{item[1]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {ingredientsArray && (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={3}
          data={ingredientsArray}
          renderItem={RenderIngredient}
          keyExtractor={(item) => `${item[0].ingredientId}`}
        />
      )}
    </>
  );
} //
