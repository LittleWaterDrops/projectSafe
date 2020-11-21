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
import { data } from './appFuncListScreen';
export var whatApp;

function thisScreen({navigation}){
  const[showData,setShowData] = useState([]);
  const[searchQuery,setSearchQuery] = useState('');
  useEffect(() => {
    setShowData(data);
  },[]);

  onChangeSearch = (query) => {
    setSearchQuery(query);

    const buffer = filter(data, function (findText){
      return findText.appName.includes(query);
    });

    if(query == ''){
      console.log('query null');
      setShowData(data);
    }
    else {
      setShowData(buffer);
    }

  }

  appFuncList = (appName) => {
    whatApp = appName;
    navigation.navigate('앱 기능 보기');
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
        <TouchableOpacity onPress={() => this.appFuncList(item.appName)}>
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
    <appListStack.Screen name="앱 별로 보기" component={thisScreen}/>
    <appListStack.Screen name="앱 기능 보기" component={appFuncListScreen}/>
    </appListStack.Navigator>
  )
}


/*      
<WebView
  source={{ uri: 'whatsapp://app' }}
  style={{ marginTop: 20 }}
/> */