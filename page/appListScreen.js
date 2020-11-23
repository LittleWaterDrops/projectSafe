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
} from 'react-native';
import styles from './style'
import filter from 'lodash.filter'
import { Searchbar } from 'react-native-paper';
import appFuncListScreen from './appFuncListScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { data } from '../findFuncScreen';

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
    style={styles.viewStyle}>
    <Searchbar
    clearButtonMode= 'while-editing'
    placeholder='앱 이름 검색'
    onChangeText={this.onChangeSearch}
    value={searchQuery}
	style={styles.searchBox}
    />
    <FlatList
      data={showData}
      keyExtractor={item => item.appName}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => this.appFuncList(item.appName)}>
          <View
      style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}></View>
          <Text style={styles.textList}>
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
    <appListStack.Screen name="앱 별로 보기" component={thisScreen}
		options = {{
			headerStyle: {backgroundColor: '#05365B',},
			headerTintColor: '#fff',
			headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }} />
    <appListStack.Screen name="앱 기능 보기" component={appFuncListScreen}
		options = {{
			headerStyle: {backgroundColor: '#05365B',},
			headerTintColor: '#fff',
			headerTitleStyle: {fontWeight: 'bold', fontFamily:'BCcardB', fontSize:18},
		  }} />
    </appListStack.Navigator>
  )
}