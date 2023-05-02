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
import { register } from "../../api/auth";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function RegisterScreen(props) {
  const { navigation } = props;
  const toast = useToast();
  const [input, setInput] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
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
  const onChangeFullNameInput = (text) => {
    console.log(text);
    setInput({
      ...input,
      fullname: text,
    });
  };
  const onChangeEmailInput = (text) => {
    console.log(text);
    setInput({
      ...input,
      email: text,
    });
  };
  const onRegisterPress = () => {
    register(input.username, input.password, input.fullname, input.email).then(
      (res) => {
        if (res.type === "success") {
          AsyncStorage.setItem("auth", "success", (error) => {
            if (error) {
              console.log("Error retrieving data: ", error);
            } else {
              AsyncStorage.setItem("name", input.username, (error) => {
                navigation.navigate("Home", res.message);
              });
              toast.show({
                render: () => {
                  return (
                    <Box bg="green.500" px="5" py="3" rounded="md" mb={5}>
                      <Text color="white">{res.message}</Text>
                    </Box>
                  );
                },
              });
            }
          });

          navigation.navigate("Home", res.message);
        } else {
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
        }
        return;
      }
    );
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>UserName</FormControl.Label>
            <Input onChangeText={onChangeNameInput} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input onChangeText={onChangePasswordInput} type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>FullName</FormControl.Label>
            <Input onChangeText={onChangeFullNameInput} />
            <FormControl.Label>Email</FormControl.Label>
            <Input type="email" onChangeText={onChangeEmailInput} />
          </FormControl>
          <Button onPress={onRegisterPress} mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
