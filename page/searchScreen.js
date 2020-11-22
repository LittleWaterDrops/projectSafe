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
import {
  runTutorial,
} from './appFuncListScreen';
import Realm from 'realm';
import { data,  } from '../findFuncScreen';



export default class searchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedData: [],
      showData: [],
      searchQuery: '',
    };
  }

  suitableData() {
    let arr = [];
    let count = 1;
    for(let i = 0; i < data.length; i++){
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
    this.setState({showData:arr});
    this.setState({changedData:arr});
  }

  componentDidMount(){
    this.suitableData();
  }

  onChangeSearch = (query) => {
    this.setState({searchQuery: query});

    const buffer = filter(this.state.changedData, function (findText){
      return findText.funcName.includes(query) || findText.appName.includes(query) ;
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
        keyExtractor={item => item.funcName}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => runTutorial(item.appName,item.authority,item.funcID,item.funcName)}>
            <View
        style={{
          flexDirection: 'row',
          padding: 16,
          alignItems: 'center'
        }}></View>
        
            <Text style={{ fontSize: 22 }}>
              {item.showedNum}. {item.appName} -  {item.funcName}
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