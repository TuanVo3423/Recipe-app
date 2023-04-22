import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Center,
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  Link,
  Input,
  Text,
  Button,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import { login } from "../../api/auth";
export default function LoginScreen(props) {
  const { navigation } = props;
  const toast = useToast();
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("auth", (error, value) => {
      if (value === "success") {
        setIsLoading(false);
        navigation.navigate("Home");
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const onChangePasswordInput = (text) => {
    console.log(text);
    setInput({
      ...input,
      password: text,
    });
  };
  const onChangeNameInput = (text) => {
    console.log(text);
    setInput({
      ...input,
      username: text,
    });
  };
  const onLoginPress = () => {
    login(input.username, input.password)
      .then((res) => {
        if (res.type === "success") {
          toast.show({
            render: () => {
              return (
                <Box bg="green.500" px="5" py="3" rounded="md" mb={5}>
                  <Text color="white">{res.message}</Text>
                </Box>
              );
            },
          });
          AsyncStorage.setItem("auth", "success", (error) => {
            if (error) {
              console.log("Error retrieving data: ", error);
            } else {
              AsyncStorage.setItem("name", input.username, (error) => {
                navigation.navigate("Home", res.message);
              });
            }
          });
        } else {
          toast.show({
            render: () => {
              return (
                <Box bg="red.500" px="5" py="3" rounded="md" mb={5}>
                  <Text color="white">{res.message}</Text>
                </Box>
              );
            },
          });
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>UserName</FormControl.Label>
            <Input onChangeText={onChangeNameInput} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input onChangeText={onChangePasswordInput} type="password" />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button onPress={onLoginPress} mt="2" colorScheme="indigo">
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
