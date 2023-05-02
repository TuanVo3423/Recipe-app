import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import getCategories from "../../api/getCategories";
import MenuImage from "../../components/MenuImage/MenuImage";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { useQuery } from "@tanstack/react-query";
import useGetRecipesStore from "../../stores/useGetRecipesStore";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [categoriesState, setCategories] = useState();
  const categoriesStore = useCategoriesStore((state) => state.categories);
  const setCategoriesStore = useCategoriesStore(
    (state) => state.setCategoriesStore
  );
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      getCategories().then((data) => {
        return data.categories;
      }),
  });
  const getNumberOfRecipes = useGetRecipesStore(
    (state) => state.getNumberOfRecipes
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const category = item;
    // console.log(title, category);
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => {
    const number = getNumberOfRecipes(item.categoryId);
    console.log("number : ", number);
    return (
      <TouchableOpacity onPress={() => onPressCategory(item)}>
        <View style={styles.categoriesItemContainer}>
          <Image
            style={styles.categoriesPhoto}
            source={{ uri: item.photo_url }}
          />
          <Text style={styles.categoriesName}>{item.name}</Text>
          <Text style={styles.categoriesInfo}>{number} recipes</Text>
        </View>
      </TouchableOpacity>
    );
  };
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      {data && (
        <FlatList
          data={data}
          renderItem={renderCategory}
          keyExtractor={(item) => `${item.categoryId}`}
        />
      )}
    </View>
  );
}
