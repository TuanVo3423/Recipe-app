import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ViewIngredientsButton(props) {
  return (
    <TouchableOpacity
      underlayColor="rgba(73,182,77,0.9)"
      onPress={props.onPress}
    >
      <View style={styles.container}>
        <Text style={styles.text}>View Ingredients</Text>
      </View>
    </TouchableOpacity>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
