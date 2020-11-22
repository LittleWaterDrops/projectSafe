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
import recentUseScreen from './page/recentUseScreen';
import searchScreen from './page/searchScreen';

import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from './schema/shcema';

export let data;

SQLite.DEBUG(true);
SQLite.enablePromise(true);

Realm.open({schema:[dataSchema,appFuncSchema]})
.then(realm => {
  data = JSON.parse(JSON.stringify(realm.objects('data')));
  // console.log(JSON.stringify(data));
  realm.close();
});

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

          <Text style={styles.modalText}>앱을 정말 종료하시겠습니까?</Text>

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
        onPress={() => navigation.navigate('최근 / 자주 사용')} 
        >
        <Text style={styles.buttonText}> 
        최근 / 자주 사용
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#F1F9FF'}]}
        onPress={() => navigation.navigate('기능 별로 보기')} 
        >
        <Text style={styles.buttonText}> 
        기능 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#BCE0FD'}]}
        onPress={() => navigation.navigate('앱 별로 보기')} 
        >
        <Text style={styles.buttonText}> 
        앱 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#7FC4FD'}]}
        onPress={() => navigation.navigate('검색')} 
        >
        <Text style={styles.buttonText}> 
        검색
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton, {backgroundColor: '#2699FB'}]}
        onPress={() => navigation.navigate('앱 리스트 설정')} 
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
      <Stack.Screen name="앱 별로 보기" component={appListScreen}  options = {{headerShown: false}} />
      <Stack.Screen name="앱 리스트 설정" component={settingScreen} />
      <Stack.Screen name="기능 별로 보기" component={funcListScreen} />
      <Stack.Screen name="최근 / 자주 사용" component={recentUseScreen} />
      <Stack.Screen name="검색" component={searchScreen} />
    </Stack.Navigator>
  );
}

function quitApp() {
  RNExitApp.exitApp();
}

function initDataBase() {
  Realm.open({schema:[dataSchema,appFuncSchema]})
.then(realm => { 
  // initial DB
  realm.write(() => {
    realm.create('data', {
      appID: 1, 
      appName: '설정', 
      authority: true, 
      appFunction:[{
        funcID: 1,
        funcName: "와이파이/인터넷연결",
        funcUsedCount: 0,
        funcUsedDate: 0,
      },{
        funcID: 2,
        funcName: "디스플레이/글씨크기",
        funcUsedCount: 0,
        funcUsedDate: 0,
      },{
        funcID: 3,
        funcName: "디스플레이/쉬운사용모드",
        funcUsedCount: 0,
        funcUsedDate: 0,
      },]
    });
    realm.create('data', {
      appID: 2, 
      appName: '유튜브',
      authority: true, 
      appFunction:[{
        funcID: 1,
        funcName: "구독과 좋아요",
        funcUsedCount: 0,
        funcUsedDate: 0,
      },{
        funcID: 2,
        funcName: "알람 설정까지",
        funcUsedCount: 0,
        funcUsedDate: 0,
      }]
    });
    realm.create('data', {
      appID: 3, 
      appName: '카카오톡',
      authority: false, 
      appFunction:[{
        funcID: 1,
        funcName: "채팅방 나가기",
        funcUsedCount: 0,
        funcUsedDate: 0,
      }]
    });
  });
  data = JSON.parse(JSON.stringify(realm.objects('data')));
  realm.close();
});
}
  
export default function App() {
  //앱 최초 실행 관련  
  const[isFirstLaunch,setIsFirstLaunch] = useState(false);
  
  async function init() {
    const FirstLaunch = await checkFirstLaunch();
    console.log('Is this first launch? : ' + JSON.stringify(FirstLaunch));

    if(FirstLaunch){
      setIsFirstLaunch(true);
      // askPermissions.askStoragePermission();
      askPermissions.defaultAppAnnounceAlert();

      initDataBase();
    }
  }

  useEffect(() => {
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