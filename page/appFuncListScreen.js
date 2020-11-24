import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Linking,
  Image,
} from 'react-native';
import filter from 'lodash.filter'
import { 
  Searchbar,
  Title,
 } from 'react-native-paper';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { whatApp } from './appListScreen';
import { data } from '../findFuncScreen';
import notification from '../notification/notification';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';
import logoSource from '../customAssets/logoSource';
import styles from '../customAssets/style';

export default class appFuncListScreen extends Component {
  constructor(props) {
    super(props);
      this.state = {
        changedData: [],
        showData: [],
        searchQuery: '',
      };
    }
   
  appNameFilteredData() {
    let arr = [];
    let count = 1;
    for(let i = 0; i < data.length; i++){
      if(data[i].appName == whatApp){
        for(let j = 0; j < data[i].appFunction.length; j++){
          let buffer = {
            showedNum: count,
            appName: data[i].appName,
            authority: data[i].authority,
            funcID: data[i].appFunction[j].funcID,
            funcName: data[i].appFunction[j].funcName
          }
          arr.push(buffer);
          count ++;
        }
      }    
    }
    this.setState({showData:arr});
    this.setState({changedData:arr});
  }

  componentDidMount(){
    this.appNameFilteredData();
    console.log(whatApp + ' app is pressed');
  }

  onChangeSearch = (query) => {
    this.setState({searchQuery: query});

    const buffer = filter(this.state.changedData, function (findText){
      return findText.funcName.includes(query);
    });

    if(query == ''){
      console.log('query null');
      this.setState({showData:this.state.changedData});
    }
    else {
      this.setState({showData:buffer});
    }

  }

  render() {
    return (
      <View
      style={
        styles.viewStyle
      }>
      <Searchbar
        clearButtonMode= 'while-editing'
        placeholder='앱 기능 검색'
        onChangeText={this.onChangeSearch}
        value={this.state.searchQuery}
		style={styles.searchBox}
      />
	  <View style={{
          borderBottomColor: '#979EA6',
          borderBottomWidth: 1,
		    }}>
		<Title
		style={
		styles.textSubtitle
		}>
        {whatApp + " 앱 기능 리스트"}
		</Title>
	  </View>
      <FlatList
        data={this.state.showData}
        keyExtractor={item => item.funcName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}></View>
        
            <Text style={styles.textList}>
              {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
    );
  }
}

export function runTutorial (appName,funcID,funcName) {
  Realm.open({schema:[dataSchema,appFuncSchema]})
  .then(realm => {
    let authorityData = realm.objects('data');
    realm.write(() => {
      if(appName == '설정'){
        if(authorityData[0].authority == true){
          settingFunc(funcID,funcName);
        }
        else{
          noAuthority(appName);
        }
      }
      if(appName == '유튜브'){
        if(authorityData[1].authority == true){
          youtubeFunc(funcID,funcName);
        }
        else{
          noAuthority(appName);
        }
      }
      if(appName == '카카오톡'){
        if(authorityData[2].authority == true){
          kakaotalkFunc(funcID,funcName);
        }
        else{
          noAuthority(appName);
        }
      }
    });
  });
}

function noAuthority(appName){
  alert('\"' + appName + '\"' + ' 앱은 안내 권한이 부여되지 않았습니다.\n\n \'앱 리스트 설정\'에서 해당 앱에 대해 안내 권한 부여 후 재시도 부탁드립니다.\n');
}

export function settingFunc(funcID,funcName) {
/*  funcID:'1', funcName: "데이터: 와이파이 없는 곳에서 인터넷 사용하기",
    funcID:'2', funcName: "디스플레이: 화면 내용 크게 만들기" */

  console.log('setting / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');

  Realm.open({schema:[dataSchema,appFuncSchema]})
  .then(realm => {
    let funcUsed = realm.objects('data')[0].appFunction[funcID-1];
    realm.write(() => {
      if(funcID == 1){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        AndroidOpenSettings.wirelessSettings();
      }
      else if(funcID == 2){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        AndroidOpenSettings.displaySettings();
      }
      else if(funcID == 3){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        AndroidOpenSettings.displaySettings();
      }
      notification.NotiFirst('setting',funcID);
    });
    realm.close();
  });
}

export function youtubeFunc(funcID,funcName) {
  /*  funcID:'1', funcName: "채널 구독하기" */
  console.log('youtube / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
  Realm.open({schema:[dataSchema,appFuncSchema]})
  .then(realm => {
    let funcUsed = realm.objects('data')[1].appFunction[funcID-1];
    realm.write(() => {
      if(funcID == 1){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        Linking.openURL('https://youtube.com');
      }
      else if(funcID == 2){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        Linking.openURL('https://youtube.com');
      }
      notification.NotiFirst('youtube',funcID);
    });
    realm.close();
  });
}

export function kakaotalkFunc(funcID,funcName) {
  console.log('kakaotalk / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
  alert("KaKaotalk 기능은 개발 중입니다.\n 양해 부탁드립니다.\n");
}