import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Linking,
} from 'react-native';
import filter from 'lodash.filter'
import { 
  Searchbar,
  Title,
 } from 'react-native-paper';
import AndroidOpenSettings from 'react-native-android-open-settings';
import { whatApp } from './appListScreen';
import { data } from '../findFuncScreen';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';

// export const data = [{
//   appID: '1', 
//   appName: '설정', 
//   authority: true, 
//   appFunction:[{
//     funcID:'1',
//     funcName: "와이파이/인터넷연결",
//   },{
//     funcID:'2',
//     funcName: "디스플레이/글씨크기",
//   },{
//     funcID:'3',
//     funcName: "디스플레이/쉬운사용모드",
//   },]},
//   {
//   appID: '2', 
//   appName: '유튜브',
//   authority: true, 
//   appFunction:[{
//     funcID:'1',
//     funcName: "구독과 좋아요",
//   },{
//     funcID:'2',
//     funcName: "알람 설정까지",
//   }]},
//   {
//   appID: '3', 
//   appName: '카카오톡',
//   authority: false, 
//   appFunction:[{
//     funcID:'1',
//     funcName: "채팅방 나가기",
//   }]},
// ]

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
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}>
      <Title
      style={{
        textAlign:'center',
        marginBottom:20,
      }}>
        {whatApp + " 앱 기능 리스트"}
      </Title>
      <Searchbar
      clearButtonMode= 'while-editing'
      placeholder='앱 이름 검색'
      onChangeText={this.onChangeSearch}
      value={this.state.searchQuery}
      />
      <FlatList
        data={this.state.showData}
        keyExtractor={item => item.funcName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
            <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center'
        }}></View>
        
            <Text style={{ fontSize: 22 }}>
              {item.showedNum}. {item.funcName}
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
/*  funcID:'1', funcName: "와이파이/인터넷연결",
    funcID:'2', funcName: "디스플레이/글씨크기",
    funcID:'3', funcName: "디스플레이/쉬운사용모드", */

  console.log('setting / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');

  Realm.open({schema:[dataSchema,appFuncSchema]})
  .then(realm => {
    let funcUsed = realm.objects('data')[0].appFunction[funcID-1];
    realm.write(() => {
      if(funcID == 1){
        let date = new Date().getTime();
        funcUsed.funcUsedCount += 1,
        funcUsed.funcUsedDate = date,
        AndroidOpenSettings.wifiSettings();
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
    });
    realm.close();
  });
}

export function youtubeFunc(funcID,funcName) {
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
    });
    realm.close();
  });
}

export function kakaotalkFunc(funcID,funcName) {
  console.log('kakaotalk / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
  alert("KaKaotalk 기능은 개발 중입니다.\n 양해 부탁드립니다.\n");
}