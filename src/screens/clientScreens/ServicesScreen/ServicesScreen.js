import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import ServiceListing from "../../../../components/ServiceListing";
import SelectDropdown from "react-native-select-dropdown";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import CheckBox from "expo-checkbox";
import { set } from "react-native-reanimated";

export default function ServicesScreen({ navigation }) {
  //displayed List in services
  const [listData, setListData] = useState([]);
  //Maintains full list at all times
  const [completeList, setCompleteList] = useState([]);
  //intermediate list to handle filters
  const [serviceList, setServiceList] = useState([]);
  //placeholder for service Type box (to maintain actual selection on filter close)
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

  const loadListData = () => {
    firebase
      .firestore()
      .collection("services")
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setCompleteList(temp);
          setListData(temp);
          setServiceList(temp);
          setAvailableList(temp);
          setRefreshing(false);
        });
      });
  };

  useEffect(() => {
    loadListData();
  }, []);

  const onRefresh = () => {
    setCompleteList([]);
    setOverallFilter([],0);
    loadListData();
  }

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
    setServiceList(completeList);
    const serviceFiltered = completeList.filter(
      (item) => item.serviceType == service
    );
    setServiceList(serviceFiltered);
    setOverallFilter(serviceFiltered, 1);
  };

  const setOverallFilter = (list, id) => {
    let overall = completeList;
    switch (id) {
      case 0:
        setListData(completeList);
        setServiceList(completeList);
        setToggleCheckBox(false);
        setPlaceHolder("All");
        break;
      case 1:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => availableList.includes(item));
        break;
      case 2:
        overall = overall.filter((item) => list.includes(item));
        overall = overall.filter((item) => serviceList.includes(item));
        break;
      default:
    }
    setListData(overall);
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
                  backgroundColorfontSize: 18,
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
                <Text style={styles.filterOptionText}>
                  Service type:
                </Text>
                <SelectDropdown
                  data={services}
                  onSelect={(selectedItem, index) => {
                    setPlaceHolder(selectedItem);
                    if (selectedItem == "All") {
                      setOverallFilter([], 0);
                    } else {
                      setServiceFilter(selectedItem);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => { return placeHolder; }}
                  rowTextForSelection={(item, index) => { return item; }}
                  buttonStyle={{
                    backgroundColor: "#FFAC1C",
                    borderRadius: 2,
                    height: 30,
                    width: 160,
                  }}
                  buttonTextStyle={{ fontWeight: "bold", color: "white" }}
                  defaultButtonText={placeHolder}
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
                <Text style={styles.filterOptionText}>
                  Company:
                </Text>
              </View>

              <View style={styles.filterOptionView}>
                <Text style={styles.filterOptionText}>
                  Location:
                </Text>
              </View>
              
              <View style={styles.filterOptionView}>
                <Text style={styles.filterOptionText}>
                  Rating:
                </Text>
              </View>

              <View style={{marginTop: 20, marginBottom: 20, flexDirection: "row",justifyContent: "center"}}>
                <TouchableOpacity
                  style={{
                    borderRadius: 6,
                    backgroundColor: "#FFAC1C",
                    width: 130,
                    height: 30,
                    justifyContent: 'center'
                  }}
                  onPress={() => setOverallFilter([], 0)}
                >
                  <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <AntDesign name="close" color="white" size={15} />
                    <Text style={{fontWeight: "bold", textAlign: "center", color: "white"}}>
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
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </ImageBackground>
  );
}
