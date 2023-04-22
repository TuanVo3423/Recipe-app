import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Toast } from "native-base";

const CustomToast = ({
  message,
  duration = 3000,
  position = "bottom",
  type = "success",
}) => {
  return (
    <Toast
      style={{ backgroundColor: type === "success" ? "green" : "red" }}
      textStyle={{ color: "#fff" }}
      position={position}
      duration={duration}
      onClose={() => console.log("Toast closed")}
      // Add any additional props you need for your custom Toast component
    >
      <Text>{message}</Text>
    </Toast>
  );
};

export default CustomToast;
