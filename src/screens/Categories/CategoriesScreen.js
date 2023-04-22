import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import getCategories from "../../api/getCategories";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import useCategoriesStore from "../../stores/useCategoriesStore";
import { useQuery } from "@tanstack/react-query";

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
        setCategoriesStore(data.categories);
        return data.categories;
      }),
  });

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
    console.log(title, category);
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image
          style={styles.categoriesPhoto}
          source={{ uri: item.photo_url }}
        />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.categoryId)} recipes
        </Text>
      </View>
    </TouchableOpacity>
  );
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      {categoriesStore && (
        <FlatList
          data={categoriesStore}
          renderItem={renderCategory}
          keyExtractor={(item) => `${item.categoryId}`}
        />
      )}
    </View>
  );
}
