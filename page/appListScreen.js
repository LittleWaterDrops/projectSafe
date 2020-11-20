import React, { 
  useState, 
  useEffect,
 } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    Linking,
} from 'react-native';
import filter from 'lodash.filter'
import { Searchbar } from 'react-native-paper';
// import { WebView } from 'react-native-webview';
import AndroidOpenSettings from 'react-native-android-open-settings';
import appFuncListScreen from './appFuncListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const data = [{
  appID: '1', 
  appName: '설정', 
  authority: true, 
  appFunction:[{
    funcID:'1',
    funcName: "와이파이/인터넷연결",
  },{
    funcID:'2',
    funcName: "디스플레이/글씨크기",
  },{
    funcID:'3',
    funcName: "디스플레이/쉬운사용모드",
  },]},
  {
  appID: '2', 
  appName: '유튜브',
  authority: true, 
  appFunction:[{
    funcID:'1',
    funcName: "구독과 좋아요",
  },{
    funcID:'2',
    funcName: "알람 설정까지",
  }]},
  {
  appID: '3', 
  appName: '카카오톡',
  authority: true, 
  appFunction:[{
    funcID:'1',
    funcName: "채팅방 나가기",
  }]},
]


function thisScreen({navigation}){
  const[showData,setShowData] = useState([]);
  const[searchQuery,setSearchQuery] = useState('');
  useEffect(() => {
    setShowData(data);
  },[]);

  onChangeSearch = (query) => {
    setSearchQuery(query);

    const buffer = filter(data, function (findText){
      return findText.appName === query;
    });

    if(query == ''){
      console.log('query null');
      setShowData(data);
    }
    else {
      setShowData(buffer);
    }

  }

  runTutorial = (appName) => {
    if(appName == '설정'){
      console.log(appName + ' app is pressed');
      AndroidOpenSettings.generalSettings();
    }
    if(appName == '유튜브'){
      console.log(appName + ' app is pressed');
      Linking.openURL('https://youtube.com');
    }
    if(appName == '카카오톡'){
      console.log(appName + ' app is pressed');
      navigation.navigate('appFuncListScreen');
    }
  }

  return (
    <View
    style={{
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 40
    }}>
    <Searchbar
    clearButtonMode= 'while-editing'
    placeholder='앱 이름 검색'
    onChangeText={this.onChangeSearch}
    value={searchQuery}
    />
    <FlatList
      data={showData}
      keyExtractor={item => item.appID}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => this.runTutorial(item.appName)}>
          <View
      style={{
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
      }}></View>
          <Text style={{ fontSize: 22 }}>
            {item.appID}.  {item.appName}
          </Text>
        </TouchableOpacity>

      )}
    />
  </View>
  );
}

const appListStack = createStackNavigator();

export default function appListScreen() {

  return (
    <appListStack.Navigator>
    <appListStack.Screen name="appListScreen" component={thisScreen}/>
    <appListStack.Screen name="appFuncListScreen" component={appFuncListScreen}/>
    </appListStack.Navigator>
  )
}


/*      
<WebView
  source={{ uri: 'whatsapp://app' }}
  style={{ marginTop: 20 }}
/> */