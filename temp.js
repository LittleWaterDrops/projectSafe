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
import { Searchbar } from 'react-native-paper';
// import { WebView } from 'react-native-webview';
import AndroidOpenSettings from 'react-native-android-open-settings';

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


export default class appListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: [],
      searchQuery: '',
    };
  }
  componentDidMount(){
    this.setState({showData:data});
  }

  onChangeSearch = (query) => {
    this.setState({searchQuery: query});

    const buffer = filter(data, function (findText){
      return findText.appName === query;
    });

    if(query == ''){
      console.log('query null');
      this.setState({showData:data});
    }
    else {
      this.setState({showData:buffer});
    }

  }

  runTutorial (appName) {
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
    }
  }

  render() {
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
      value={this.state.searchQuery}
      />
      <FlatList
        data={this.state.showData}
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
}

/*      
<WebView
  source={{ uri: 'whatsapp://app' }}
  style={{ marginTop: 20 }}
/> */