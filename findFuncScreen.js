import 'react-native-gesture-handler';
import React,{
  useState, 
  useEffect,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Modal,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RNExitApp from 'react-native-exit-app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';

import checkFirstLaunch from './permission/checkFirstLaunch';
import askPermissions from './permission/askPermissions';
import appListScreen from './page/appListScreen';
import settingScreen from './page/settingScreen';
import funcListScreen from './page/funcListScreen';
import resentUseScreen from './page/resentUseScreen';
import searchScreen from './page/searchScreen';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

function HomeScreen({ navigation }) {
  const[modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          style={{ ...styles.modalBackground}}
          onPress={() => setModalVisible(!modalVisible)}
        ></TouchableOpacity>
        <View style={styles.modalView}>
        <Text style={styles.modalTitle}>어플리케이션 종료</Text>

          <Text style={styles.modalText} >앱을 정말 종료하시겠습니까?</Text>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => quitApp()}
          >
            <Text style={styles.textStyle}>예</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>아니오</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ ...styles.modalBackground}}
          onPress={() => setModalVisible(!modalVisible)}
        ></TouchableOpacity>
      </Modal>
      
      <ImageBackground
        resizeMode = 'contain'
        style = {{height:'100%',width:'100%'}}
        source = {require('./page_image/FG_function_find.png')}
      >
      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#FFFFFF'}]}
        onPress={() => navigation.navigate('resentUseScreen')} 
        >
        <Text style={styles.buttonText}> 
        최근 / 자주 사용
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#F1F9FF'}]}
        onPress={() => navigation.navigate('funcListScreen')} 
        >
        <Text style={styles.buttonText}> 
        기능 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#BCE0FD'}]}
        onPress={() => navigation.navigate('appListScreen')} 
        >
        <Text style={styles.buttonText}> 
        앱 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#7FC4FD'}]}
        onPress={() => navigation.navigate('searchScreen')} 
        >
        <Text style={styles.buttonText}> 
        검색
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#2699FB'}]}
        onPress={() => navigation.navigate('settingScreen')} 
        >
        <Text style={styles.buttonText}> 
          앱 리스트 설정
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#0077FF'}]}
        onPress={() => setModalVisible(true)} 
        >
        <Text style={styles.buttonText}> 
        앱 종료
        </Text>
      </TouchableOpacity>
      </ImageBackground>
    </View> 
  );
}

export const Stack = createStackNavigator();

function MyStack() {
  setTimeout(() => {
      SplashScreen.hide();
  }, 100);

  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={HomeScreen} options = {{headerShown: false}}/>
      <Stack.Screen name="appListScreen" component={appListScreen}  options = {{headerShown: false}} />
      <Stack.Screen name="settingScreen" component={settingScreen} />
      <Stack.Screen name="funcListScreen" component={funcListScreen} />
      <Stack.Screen name="resentUseScreen" component={resentUseScreen} />
      <Stack.Screen name="searchScreen" component={searchScreen} />
    </Stack.Navigator>
  );
}

function quitApp() {
  RNExitApp.exitApp();
}

export default function App() {
  //앱 최초 실행 관련  
  const[isFirstLaunch,setIsFirstLaunch] = useState(false);
  const[users,setUsers] = useState([]);
  
  async function init() {
    const FirstLaunch = await checkFirstLaunch();
    console.log('Is this first launch? : ' + JSON.stringify(FirstLaunch));

    if(FirstLaunch){
      setIsFirstLaunch(true);
    }
  }
  useEffect(() => {
    // askPermissions.askStoragePermission();
    // askPermissions.voiceAnnounceAlert();

    /*
    const db = SQLite.openDatabase(
    {
      name: 'testDB.db',
      location:'default',
      createFromLocation: '~www/testDB.db',
    },() => {console.log('yes');}, error => {console.log(error);});

    (DB)=>{
      console.log("success to open DB");

      DB.transaction(tx => {
        tx.executeSql(`DROP TABLE authority`)
        .then(() => {
          console.log('sqlite DROP TABLE done');
        })
        .catch((error) => {
          console.log('sqlite DROP TABLE error: ', error);
        });
      }
      )
      .then(() => {
        console.log('create table transaction done');
      })
      .catch((error) => {
        console.log('create table transaction fail: ', error);
      });

      DB.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS authority (
          appname TEXT,
          appchange TEXT
        )`)
        .then(() => {
          console.log('sqlite CREATE TABLE done');
        })
        .catch((error) => {
          console.log('sqlite CREATE TABLE error: ', error);
        });
      }
      )
      .then(() => {
        console.log('create table transaction done');
      })
      .catch((error) => {
        console.log('create table transaction fail: ', error);
      });
      /*
      DB.transaction(tx => {
        tx.executeSql(`INSERT INTO authority (appname) VALUES ("Setting")`)
        .then(() => {
          console.log('sqlite INSERT TABLE done');
        })
        .catch((error) => {
          console.log('sqlite INSERT TABLE error: ', error);
        });
      })
     DB.transaction(tx => {
        tx.executeSql('SELECT * FROM authority',[],(tx,results) => {
          const rows = results.rows;
          let user = [];

          for (let i = 0; i <row.length;i++){
            user.push({
              ...rows.item(i),
            });
          }
          
          setUsers(user);
          console.warn(users);
        })
        .then(() => {
          console.log('sqlite SELECT TABLE done');
        })
        .catch((error) => {
          console.log('sqlite SELECT TABLE error: ', error);
        });
      }) */



    init();
  },[]);      

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    flex: 1/6,
  },
  buttonText: {
    color: 'black',
    fontSize: 21,
  },
  modalBackground: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "stretch",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    alignItems: "stretch",
    elevation: 10,
  },
  openButton: {
    color: "#000000",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 40,
    fontWeight: "normal",
    fontSize: 15,
    color: 'gray',
    textAlign: "center",
  }
});