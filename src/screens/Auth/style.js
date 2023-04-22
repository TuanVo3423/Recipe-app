const React = require("react-native");

const { StyleSheet } = React;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    padding: 10,
    // backgroundColor: "red",
    // alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 100,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  ButtonAuth: {
    marginTop: 10,
    marginBottom: 20,
    width: 350,
    alignItems: "center",
  },
});
export default styles;
