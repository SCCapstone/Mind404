import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import ServiceListing from "../../../../components/ServiceListing";
import SelectDropdown from "react-native-select-dropdown";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from "expo-checkbox";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ServicesScreen({ navigation }) {
  //displayed List in services
  const [listData, setListData] = useState([]);
  //Maintains full list at all times
  const [completeList, setCompleteList] = useState([]);
  //intermediate list to handle filters
  const [serviceList, setServiceList] = useState([]);
  //placeholder for service Type box (to maintain actual selection on filter close)
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [city, setCity] = useState("");
  const [state, setState] = useState("State");

  const [companyName, setCompanyName] = useState("");
  const [companyList, setCompanyList] = useState([]);

  const [rating, setRating] = useState(0);
  const [ratingList, setRatingList] = useState([]);
  const [provRatings, setProvRatings] = useState([]);

  const [placeHolder, setPlaceHolder] = useState("All");
  const [availableList, setAvailableList] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  const services = [
    "All",
    "Landscaping",
    "Car Detailing",
    "Housekeeping",
    "Accounting",
    "Tech Support",
    "Tutoring",
    "Contracting",
    "Consulting",
  ];
  const allStates = [
    "State",
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UM",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  const loadListData = () => {
    firebase
      .firestore()
      .collection("services")
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
        });
        setCompleteList(temp);
        setListData(temp);
        setServiceList(temp);
        setAvailableList(temp);
        setCityList(temp);
        setStateList(temp);
        setCompanyList(temp);
        setRatingList(temp);
        setRefreshing(false);
      });
  };

  const getAverageRatings = () => {
    firebase
      .firestore()
      .collection('users')
      .where('typeOfUser', '==', 'Provider')
      .onSnapshot((querySnapshot) => {
        let temp = [];
        let pairPR = [];
        querySnapshot.forEach((documentSnapshot) => {
          temp.push(documentSnapshot.data())
        });
        for(let i = 0; i <temp.length; i++){
          let providerID = temp[i].id;
          let avgRating = temp[i].avgRating;
          if(avgRating == null){
            avgRating = 0;
          }
          pairPR.push([providerID,avgRating])
        }
        setProvRatings(pairPR);
      });
  }

  useEffect(() => {
    loadListData();
    //getAverageRatings();
  }, []);

  const onRefresh = () => {
    setCompleteList([]);
    setListData([]);
    setOverallFilter([], 0);
  };

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
        }}
      />
    );
  };

  const setServiceFilter = (service) => {
    if (service == "All") {
      setServiceList(completeList);
      setOverallFilter(completeList, 1);
    } else {
      const serviceFiltered = completeList.filter(
        (item) => item.serviceType == service
      );
      setServiceList(serviceFiltered);
      setOverallFilter(serviceFiltered, 1);
    }
  };

  const setCityFilter = (loca) => {
    let locationFiltered = [];
    if (loca.length > 1) {
      locationFiltered = completeList.filter(
        (item) => item.location.slice(0, -4) == loca
      );
    } else {
      locationFiltered = completeList;
    }
    setCityList(locationFiltered);
    setOverallFilter(locationFiltered, 3);
  };

  const setStateFilter = (loca) => {
    let locationFiltered = [];
    if (loca == "State") {
      locationFiltered = completeList;
    } else {
      locationFiltered = completeList.filter(
        (item) => item.location.slice(-2) == loca
      );
    }

    setStateList(locationFiltered);
    setOverallFilter(locationFiltered, 4);
  };

  const setCompanyFilter = (name) => {
    if (name.length > 1) {
      const companyFiltered = completeList.filter(
        (item) => item.CompanyName == name
      );
      setCompanyList(companyFiltered);
      setOverallFilter(companyFiltered, 5);
    } else {
      setCompanyList(completeList);
      setOverallFilter(completeList, 5);
    }
  };

  const setRatingFilter = (rate) => {
    if(rate == 0){
      setRatingList(completeList)
      setOverallFilter(completeList, 6)
    } else {
      getAverageRatings();
      const temp = completeList;
      const ratingFiltered = [];
      provRatings.forEach(provider => {
        temp.forEach(service => {
          if(provider[0] == service.providerId){
            if(provider[1] >= rate){
              ratingFiltered.push(service)
            }
          }
        })
      })
      setRatingList(ratingFiltered)
      setOverallFilter(ratingFiltered, 6)
    }
  };

  const setOverallFilter = (list, id) => {
    let overall = completeList;
    switch (id) {
      case 0:
        loadListData();
        getAverageRatings();
        setToggleCheckBox(false);
        setPlaceHolder("All");
        setState("State");
        setCity("");
        setCompanyName("");
        break;
      case 1:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        overall = overall.filter((item) => cityList.includes(item));
        overall = overall.filter((item) => stateList.includes(item));
        overall = overall.filter((item) => companyList.includes(item));
        overall = overall.filter((item) => ratingList.includes(item));
        setListData(overall);
        break;
      case 2:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        overall = overall.filter((item) => cityList.includes(item));
        overall = overall.filter((item) => stateList.includes(item));
        overall = overall.filter((item) => companyList.includes(item));
        overall = overall.filter((item) => ratingList.includes(item));
        setListData(overall);
        break;
      case 3:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        overall = overall.filter((item) => stateList.includes(item));
        overall = overall.filter((item) => companyList.includes(item));
        overall = overall.filter((item) => ratingList.includes(item));
        setListData(overall);
        break;
      case 4:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        overall = overall.filter((item) => cityList.includes(item));
        overall = overall.filter((item) => companyList.includes(item));
        overall = overall.filter((item) => ratingList.includes(item));
        setListData(overall);
        break;
      case 5:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        overall = overall.filter((item) => cityList.includes(item));
        overall = overall.filter((item) => stateList.includes(item));
        overall = overall.filter((item) => ratingList.includes(item));
        setListData(overall);
        break;
      case 6:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        overall = overall.filter((item) => cityList.includes(item));
        overall = overall.filter((item) => stateList.includes(item));
        overall = overall.filter((item) => companyList.includes(item));
        setListData(overall);
      default:
    }
  };

  const setAvail = () => {
    let currentHour = new Date().getHours();
    let temp = [];
    let avail = completeList;
    avail.forEach((item) => {
      let toTime = item.toTime;
      let fromTime = item.fromTime;
      if (toTime < fromTime) {
        toTime = toTime + 24;
      }
      if (currentHour < fromTime) {
        currentHour = currentHour + 24;
      }
      if (
        toTime == fromTime ||
        (currentHour > fromTime && currentHour < toTime)
      ) {
        temp.push(item);
      }
    });
    return temp;
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
        <Text
          style={{
            color: "#FFAC1C",
            paddingTop: 30,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 33,
            textShadowColor: "black",
            textShadowRadius: 2,
          }}
        >
          Services
        </Text>
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
        >
        <View style={{ flex: 1 }}>
            <Collapse>
              <CollapseHeader>
                <View
                  style={{
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      fontStyle: "italic",
                      marginEnd: 3,
                      color: "#1C6FFF",
                    }}
                  >
                    Filter
                  </Text>
                  <AntDesign name="down" color="#1C6FFF" size={15} />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.filterMenuView}>
                  <View style={styles.filterOptionView}>
                    <Text style={styles.filterOptionText}>Service type:</Text>
                    <SelectDropdown
                      data={services}
                      onSelect={(selectedItem, index) => {
                        setPlaceHolder(selectedItem);
                        setServiceFilter(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return placeHolder;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={{
                        backgroundColor: "#FFAC1C",
                        borderRadius: 2,
                        height: 30,
                        width: 160,
                      }}
                      buttonTextStyle={{ fontWeight: "bold", color: "white" }}
                      defaultButtonText={placeHolder}
                      renderDropdownIcon={isOpened => {
                        return <MaterialCommunityIcon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                      }}
                    />
                  </View>
                  <View style={styles.filterOptionView}>
                    <Text style={styles.filterOptionText}>
                      Currently Available to Call:
                    </Text>
                    <CheckBox
                      disable={false}
                      value={toggleCheckBox}
                      onValueChange={(newValue) => {
                        setToggleCheckBox(newValue);
                        if (newValue) {
                          setOverallFilter(setAvail(), 2);
                          setAvailableList(setAvail());
                        } else {
                          setOverallFilter(completeList, 2);
                          setAvailableList(completeList);
                        }
                      }}
                    />
                  </View>

                  <View style={styles.filterOptionView}>
                    <Text style={styles.filterOptionText}>Company:</Text>
                    <TextInput
                      style={styles.cityInput}
                      placeholder="Company Name"
                      placeholderTextColor="#aaaaaa"
                      onChangeText={(text) => {
                        setCompanyName(text);
                        setCompanyFilter(text);
                      }}
                      value={companyName}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      maxLength={40}
                    />
                  </View>

                  <View style={styles.filterOptionView}>
                    <Text style={styles.filterOptionText}>Location:</Text>
                    <TextInput
                      style={styles.cityInput}
                      placeholder="City"
                      placeholderTextColor="#aaaaaa"
                      onChangeText={(text) => {
                        setCity(text);
                        setCityFilter(text);
                      }}
                      value={city}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      maxLength={40}
                    />
                    <SelectDropdown
                      data={allStates}
                      onSelect={(selectedItem, index) => {
                        setState(selectedItem);
                        setStateFilter(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return state;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                      buttonStyle={{
                        backgroundColor: "white",
                        borderRadius: 4,
                        height: 48,
                        width: 80,
                        borderColor: "#d3d3d3",
                        borderWidth: 1,
                      }}
                      buttonTextStyle={{ fontSize: 14, color: "#aaaaaa" }}
                      defaultButtonText={state}
                    />
                  </View>

                  <View style={styles.filterOptionView}>
                    <Text style={styles.filterOptionText}>Customer Reviews:</Text>
                  </View>
                  <View style={styles.ratingsContainer}>
                    <TouchableOpacity
                      style={styles.ratingFilterButton}
                      onPress={() => {
                        setRating(4)
                        setRatingFilter(4)
                      }}
                    >
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <Text styles={{fontSize: 12, fontWeight: 'bold'}}>
                          {' &'} Up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ratingFilterButton}
                      onPress={() => setRatingFilter(3)}
                    >
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <Text styles={{fontSize: 12, fontWeight: 'bold'}}>
                          {' &'} Up
                        </Text>
                    </TouchableOpacity>
                  
                    <TouchableOpacity
                      style={styles.ratingFilterButton}
                      onPress={() => setRatingFilter(2)}
                    >
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <Text styles={{fontSize: 12, fontWeight: 'bold'}}>
                          {' &'} Up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ratingFilterButton}
                      onPress={() => setRatingFilter(1)}
                    >
                        <MaterialCommunityIcon name="star" color="#000" size={18} />
                        <Text styles={{fontSize: 12, fontWeight: 'bold'}}>
                          {' &'} Up
                        </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.ratingFilterButton}
                      onPress={() => setRatingFilter(0)}
                    >
                        <Text styles={{fontSize: 12, fontWeight: 'bold'}}>
                          Any Rating
                        </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      marginBottom: 20,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 6,
                        backgroundColor: "#FFAC1C",
                        width: 130,
                        height: 30,
                        justifyContent: "center",
                      }}
                      onPress={() => setOverallFilter([], 0)}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AntDesign name="close" color="white" size={15} />
                        <Text
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          Clear All Filters
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          
          <View
            style={{
              borderBottomColor: "#949494",
              flex: 1,
              marginBottom: 3,
            }}
          />
          <FlatList
            data={listData}
            ItemSeparatorComponent={itemSeperatorView}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ServiceListing item={item} />}
            ListEmptyComponent={() => (
              <Text style={styles.noEvent}>
                No services are available with the applied filters.
              </Text>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            scrollEnabled={false}
          />
        </View>
        </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
