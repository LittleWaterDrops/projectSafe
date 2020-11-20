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

const data = [
  {id: '1', text: '설정'},
  {id: '2', text: '유튜브'},
  {id: '3', text: '카카오톡'}
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
      return findText.text === query;
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
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.runTutorial(item.text)}>
            <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center'
        }}></View>
            <Text style={{ fontSize: 22 }}>
              {item.id}.  {item.text}
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