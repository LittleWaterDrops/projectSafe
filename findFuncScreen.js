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
	ScrollView,
  Modal,
	Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RNExitApp from 'react-native-exit-app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import checkFirstLaunch from './permission/checkFirstLaunch';
import askPermissions from './permission/askPermissions';
import appListScreen from './page/appListScreen';
import settingScreen from './page/settingScreen';
import funcListScreen from './page/funcListScreen';
import recentUseScreen from './page/recentUseScreen';
import searchScreen from './page/searchScreen';
import notification from './notification/notification';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from './schema/shcema';

export let data;

notification.notiConfig();

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
            style={{ ...styles.openButton, backgroundColor: "#032340" }}
            onPress={() => quitApp()}
          >
            <Text style={styles.textStyle}>예</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: "#032340" }}
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
      
      <View
        resizeMode = 'contain'
        style = {{height:'100%',width:'100%',justifyContent:"center", alignItems:"center",backgroundColor:"#032340", paddingTop:"10%"}}
      >
	  <ScrollView style={{width:"100%", height:"100%"}}>
      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate('최근 / 자주 사용')} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/clock.png')} />
        <Text style={styles.buttonText}> 
        최근 / 자주 사용
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate('기능 별로 보기')} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/list.png')} />
        <Text style={styles.buttonText}> 
        기능 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate('앱 별로 보기')} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/app.png')} />
        <Text style={styles.buttonText}> 
        앱 별로 보기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate('검색')} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/search.png')} />
        <Text style={styles.buttonText}> 
        검색
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => navigation.navigate('앱 리스트 설정')} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/setting.png')} />
        <Text style={styles.buttonText}> 
          앱 리스트 설정
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.menuButton]}
        onPress={() => setModalVisible(true)} 
        >
		<Image style={styles.buttonImage} source={require('./android/app/src/main/res/drawable/quit.png')} />
        <Text style={styles.buttonText}> 
        앱 종료
        </Text>
      </TouchableOpacity>
	  </ScrollView>		
      </View>
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
      <Stack.Screen name="앱 별로 보기" component={appListScreen}   options = {{headerShown: false}}
		  />
      <Stack.Screen name="앱 리스트 설정" component={settingScreen}
		    options = {{
			    headerStyle: {backgroundColor: '#05365B',},
			    headerTintColor: '#fff',
			    headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }}/>
      <Stack.Screen name="기능 별로 보기" component={funcListScreen}
        options = {{
          headerStyle: {backgroundColor: '#05365B',},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }}/>
      <Stack.Screen name="최근 / 자주 사용" component={recentUseScreen}
        options = {{
          headerStyle: {backgroundColor: '#05365B',},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }}/>
      <Stack.Screen name="검색" component={searchScreen}
        options = {{
          headerStyle: {backgroundColor: '#05365B',},
          headerTintColor: '#fff',
          headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }}/>
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
        funcName: "데이터: 와이파이 없는 곳에서 인터넷 사용하기",
        funcUsedCount: 0,
        funcUsedDate: 0,
      },{
        funcID: 2,
        funcName: "디스플레이: 화면 내용 크게 만들기",
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
        funcName: "채널 구독하기",
        funcUsedCount: 0,
        funcUsedDate: 0,
      }]
    });
    /* realm.create('data', {
      appID: 3, 
      appName: '카카오톡',
      authority: false, 
      appFunction:[{
        funcID: 1,
        funcName: "채팅방 나가기",
        funcUsedCount: 0,
        funcUsedDate: 0,
      }]
    }); */
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
      
      notification.notiInit();
      
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
    height: 120,
    width: "100%",
    backgroundColor: "#05365B",
    justifyContent: 'center',
    margin:"1%",
    borderRadius: 10,
    alignItems:"center"
  },
  buttonImage: {
  	  height: 50,
      width: 50,
      marginBottom: 10,
  },
  buttonText: {
    color: '#F2F2F2',	
	  fontFamily: 'BCcardB',
    fontSize: 20,
	  textAlign: "center"
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
	fontFamily: 'BCcardL',
    color: 'gray',
    textAlign: "center",
  }
});