import React,{ useState, useEffect} from 'react';
import { View, Text , Image, FlatList,StyleSheet,TouchableOpacity, ImageBackground} from 'react-native';
import { firebase } from "../../../firebase/config";
import {FAB} from 'react-native-paper';
import styles from "./../../../../components/styles";
import { NavigationContainer } from "@react-navigation/native";
import useUser from "../../../../useUser";

export default function ChatScreen( {navigation} ) {
  
  const [users,setUsers] = useState(null)
    const user = firebase.auth().currentUser;
    const getUsers = async ()=>{
             const querySanp = await firebase.firestore().collection('users').where('uid','!=',user.uid).get()
             const allusers = querySanp.docs.map(docSnap=>docSnap.data())
             console.log(allusers)
             setUsers(allusers)
    }

    useEffect(()=>{
        getUsers()
    },[])

    const RenderCard = ({item})=>{
          return (
              <TouchableOpacity onPress={()=>navigation.navigate('chat',{name:item.name,uid:item.uid,
                status :typeof(item.status) =="string"? item.status : item.status.toDate().toString()
            })}>
              <View style={styles.mycard}>
                  <Image source={{uri:item.pic}} style={styles.img}/>
                  <View>
                      <Text style={styles.text}>
                          {item.name}
                      </Text>
                      <Text style={styles.text}>
                          {item.email}
                      </Text>
                  </View>
              </View>
              </TouchableOpacity>
          )
    }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.footerView}>
        <Text style ={styles.welcome}>Chat</Text>
      </View>
      <View style={{flex:1}}>
            <FlatList 
              data={users}
              renderItem={({item})=> {return <RenderCard item={item} /> }}
              keyExtractor={(item)=>item.uid}
            />
        </View>
    </ImageBackground>
  );
}
