import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Image,
  Stack,
  HStack,
  Button,
  useToast,
} from "native-base";
import { ScrollView } from "react-native-virtualized-view";
import { useMutation, useQuery } from "@tanstack/react-query";
import getFavoriteByUserId, { deleteFavoriteById } from "../../api/getFavorite";
import useGetRecipesStore from "../../stores/useGetRecipesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

const FavoriteScreen = (props) => {
  const { navigation } = props;
  const toast = useToast();
  const recipeStore = useGetRecipesStore((state) => state.recipesStore);
  const [id, setId] = useState();
  AsyncStorage.getItem("userId").then((res) => setId(res));
  const mutation = useMutation({
    mutationFn: async (favoriteId) => deleteFavoriteById(favoriteId),
    onError: (err) => console.log(err),
    onSuccess: (res) => {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="5" py="3" rounded="md" mb={5}>
              <Text color="white">{res.message}</Text>
            </Box>
          );
        },
        duration: 2000,
        isClosable: true,
      });
      refetch();
    },
  });
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    enabled: id != null,
    queryKey: ["favorites", id],
    queryFn: async () =>
      getFavoriteByUserId(id, recipeStore).then((favorites) => favorites),
  });
  console.log("data : ", data);
  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };
  return (
    <ScrollView alignItems="center">
      <Spinner visible={isLoading} />
      {!isLoading &&
        data?.data?.map((item, idx) => {
          return (
            <Box
              key={idx}
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Spinner
                visible={mutation.isLoading}
                textContent={"Loading..."}
              />
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: item.photo_url,
                    }}
                    alt="image"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _dark={{
                    bg: "violet.400",
                  }}
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  PHOTOS
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {item.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    Time : {item.time} minutes.
                  </Text>
                </Stack>
                {/* <Text fontWeight="400">{item.description}</Text> */}
                <HStack alignItems="center" space={4} justifyContent="flex-end">
                  <HStack space={1}>
                    <Button onPress={() => onPressRecipe(item)}>
                      See more
                    </Button>
                    <Button
                      onPress={() => mutation.mutate(data.response[idx]._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          );
        })}
    </ScrollView>
  );
};

export default FavoriteScreen;
