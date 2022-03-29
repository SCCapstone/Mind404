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
    width: 500,
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
  searchInput: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 50,
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
    elevation: 20,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  mapWrapper: {
    backgroundColor: "grey",
    width: "100%",
  },
  map: {
    width: "100%",
    height: "90%",
  },
  headerDate: {
    fontSize: 32, fontWeight: 'bold', textAlign: 'right', paddingEnd: 20, paddingTop: 20
  },
  headerWelcome: {
    fontSize: 32, color: '#FFAC1C',fontWeight: 'bold', textAlign: 'left', paddingStart: 20, paddingTop: 20
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
    marginTop: 15,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postService: {
    backgroundColor: "#FFAC1C",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  switchText: {
    fontFamily: "sans-serif",
    fontSize: 18,
    textAlign: "center",
    color: "black",
    borderRadius: 3,
    borderTopColor: "#d3d3d3",
    borderBottomColor: "#d3d3d3",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 1,
    padding: 7,
    backgroundColor: "white",
    marginRight: 30,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    flex: 1,
    padding: 8,
    marginEnd: 20,
    marginStart: 20,
  },
  explanation: {
    fontSize: 16,
    color: "black",
    padding: 6,
    marginStart: 20,
  },
  timeSelection: {
    fontFamily: "sans-serif",
    fontSize: 15,
    textAlign: "center",
    color: "black",
    borderRadius: 8,
    padding: 10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    backgroundColor: "white",
  },
  timeButton: {
    backgroundColor: "#788eec",
    borderRadius: 5,
    padding: 10,
    marginStart: 30,
    marginEnd: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTypeButton: {
    backgroundColor: "#788eec",
    marginStart: 30,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  //
  //Service Details
  bookButton: {
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
    fontFamily: "serif",
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    marginBottom: 12,
    color: "black",
  },
  location: {
    fontFamily: "serif",
    fontSize: 15,
    textAlign: "center",
  },
  email:{
    fontFamily: "serif",
    fontSize: 15,
    textAlign: "center",
  },
  company: {
    fontFamily: "serif",
    fontSize: 15,
    textAlign: "center",
  },
  phoneNumber: {
    fontFamily: "serif",
    fontSize: 15,
    color: "blue",
    textDecorationLine: "underline",
    padding: 7,
    textAlign: "center",
    marginRight: 25,
  },
  locationNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",

  },

  // Profile Screen
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
  },
  profileDescriptionWrapper: {
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    width: "100%",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  marginTop10: {
    marginTop: 10,
  },
  // Profile Edit Screen
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },

  //Calendar Screen
  subject: {
    marginTop: -10,
    fontWeight: "bold",
    fontSize: 22,
  },

  descriptionEvent: {
    fontSize: 18,
    width: "100%",
    textAlign: "left",
    marginBottom: 12,
    color: "black",
  },

  dateTitle:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#788eec',
    paddingBottom: 2
  },
  TOContainer: {
    flexDirection: "row",
    borderRadius: 5,
    justifyContent: 'space-around',
    backgroundColor: '#FFAC1C',
    marginTop: 4,
    marginBottom: 4,
    width: 140,
    textAlign: 'center',
    marginStart: 125
  },
  selectedDateOption: {
    fontFamily: "sans-serif",
    fontSize: 15,
    justifyContent: 'space-evenly',
    textAlign: "center",
    color: "black",
    borderRadius: 8,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 7,
    backgroundColor: "white",
  },
  noEvent: {
    fontSize: 14,
    marginTop: 13,
    color: '#D1F4FA',
    textAlign: 'center'
  },
  explanation2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
    padding: 6,
    marginStart: 20,
  },
  refresh: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'right',
    marginStart: 260,
  },
  refresh2: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 2,
    alignContent: 'center',
    justifyContent: 'center'
  },
  listTitle:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  filterOptionView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  filterOptionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    padding: 6,
    marginStart: 20,
  },
  filterMenuView: {
    backgroundColor: "#9CC0FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 3,
    marginTop: 3,
    marginStart: 6,
    marginEnd: 6,
  },
  timeExplanation: {
    fontSize: 13,
    color: "black",
    padding: 6,
    marginStart: 20,
    fontWeight: 'bold',
  },
  cityInput: {
    height: 48,
    width: 200,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 16,
    borderColor: "#d3d3d3",
    borderWidth: 1,
  },
  ratingFilterButton:{
    borderRadius: 4,
    backgroundColor: "white",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    elevation: 3,
    padding: 5,
    margin: 2
  },
  ratingsContainer: {
    flexDirection: "row",
    marginTop: 5,
    alignContent: 'center',
    justifyContent: 'center'
  },
});
