import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../../api/getCategories";
import { Box, Button, Flex, useToast } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createFavorite } from "../../api/getFavorite";
import Spinner from "react-native-loading-spinner-overlay";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const toast = useToast();
  const [id, setId] = useState();
  AsyncStorage.getItem("userId").then((res) => setId(res));
  const { navigation, route } = props;
  const item = route.params?.item;
  const mutation = useMutation({
    mutationFn: () => createFavorite(id, item.recipeId),
    onError: (err) => console.log(err),
    onSuccess: (res) =>
      toast.show({
        render: () => {
          return (
            <Box bg="green.500" px="5" py="3" rounded="md" mb={5}>
              <Text color="white">{res.message}</Text>
            </Box>
          );
        },
        duration: 2000,
        isClosable: true,
      }),
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const categoryId = item.categoryId;
      const data = await getCategoryById(categoryId);
      return data.category;
    },
  });

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // const onPressIngredient = (item) => {
  //   var name = getIngredientName(item);
  //   let ingredient = item;
  //   navigation.navigate("Ingredient", { ingredient, name });
  // };
  if (isLoading) {
    return <Spinner visible={isLoading} textContent={"Loading..."} />;
  } else {
    return (
      <ScrollView style={styles.container}>
        <Spinner visible={mutation.isLoading} textContent={"Loading..."} />
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={slider1Ref}
              data={item.photosArray}
              renderItem={renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref.current}
              tappableDots={!!slider1Ref.current}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate("RecipesList", { data })}
            >
              <Text style={styles.category}>{data.name.toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/time.png")}
            />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>

          <Flex w="100%" mt={4} justify="center" align="center">
            <Button
              onPress={() => {
                let ingredients = item.ingredients;
                let title = "Ingredients for " + item.title;
                navigation.navigate("IngredientsDetails", {
                  ingredients,
                  title,
                });
              }}
              w="200px"
              variant="outline"
              borderColor="#2cd18a"
              borderRadius="full"
              colorScheme="rgba(73,182,77,0.9)"
              color="#2cd18a"
              mb={2}
            >
              See the ingredients
            </Button>
            <Button
              onPress={() => mutation.mutate()}
              w="200px"
              variant="outline"
              borderColor="#2cd18a"
              borderRadius="full"
              colorScheme="rgba(73,182,77,0.9)"
              color="#2cd18a"
            >
              Add to favorite
            </Button>
          </Flex>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
