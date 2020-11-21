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
  if(appName == '설정'){
    settingFunc(funcID,funcName);
  }
  if(appName == '유튜브'){
    youtubeFunc(funcID,funcName);
  }
  if(appName == '카카오톡'){
    kakaotalkFunc(funcID,funcName);
  }
}


export function settingFunc(funcID,funcName) {
  console.log('setting / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
  // AndroidOpenSettings.generalSettings();
}

export function youtubeFunc(funcID,funcName) {
  console.log('youtube / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
  // Linking.openURL('https://youtube.com');
}

export function kakaotalkFunc(funcID,funcName) {
  console.log('kakaotalk / funcID: ' + funcID + ' / funcName: ' + funcName + ' is pressed');
}
/*
AndroidOpenSettings.generalSettings();
Linking.openURL('https://youtube.com');
*/