import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //General
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },

  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  logo: {
    flex: 1,
    height: 120,
    width: 380,
    alignSelf: "center",
    margin: 30,
  },
  //
  // Registration/login Screen
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#788eec",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
  dropDown: {
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "center",
    color: "black",
    borderRadius: 8,
    borderColor: "#d3d3d3",
    borderBottomWidth: 3,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    padding: 7,
    backgroundColor: "#FFAC1C",
    marginLeft: 0,
    marginRight: 30,
    shadowColor: "black",
  },
  selectedOption: {
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "center",
    color: "black",
    borderRadius: 8,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 7,
    backgroundColor: "white",
    marginRight: 30,
  },

  containerSide: {
    flexDirection: "row",
    alignItems: "baseline",
    flex: 1,
  },
  //
  //Home Screen
  space: {
    textAlign: "center",
    marginVertical: 120,
  },
  welcome: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 35,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    color: "#FFAC1C",
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  mapWrapper: {
    backgroundColor: "grey",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  //
  // SettingsScreen
  settingsButton: {
    marginRight: 15,
    marginTop: 30,
    height: 35,
    borderRadius: 9,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  changePasswordButton: {
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  //

  //ServicesScreen
  postButton: {},
  //

  //ServicesPostScreen
  multilineInput: {
    height: 148,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
  instructionText: {
    fontSize: 18,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  servicesPostButton: {
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  //
  //Service Details
  bookButton:{
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 35,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    color: "black",
  },
  description: {
    fontFamily: "sans-serif",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    color: "black",
  },
  location: {
    fontFamily: "sans-serif",
    fontSize: 15,
    padding:7,
    textAlign: "center",
    marginLeft: 25,
  },
  phoneNumber:{ 
    fontFamily: "sans-serif",
    fontSize: 15,
    color: "blue", 
    textDecorationLine: "underline",
    padding: 7,
    textAlign: "center",
    marginRight: 25,
  },
  locationNumberContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    flex: 1,
    justifyContent: "space-between"
  }
});
