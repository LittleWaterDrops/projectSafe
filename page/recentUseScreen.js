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
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';
// import { data,  } from '../findFuncScreen';



export default class recentUseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentShowData: [],
      freqShowData: [],
    };
  }


  filteredData() {
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        let data = realm.objects('data');
        let arr = [];
        for(let i = 0; i < data.length; i++){
          for(let j = 0; j < data[i].appFunction.length; j++){
            let buffer = {
              appName: data[i].appName,
              authority: data[i].authority,
              funcID: data[i].appFunction[j].funcID,
              funcName: data[i].appFunction[j].funcName,
              funcUsedCount: data[i].appFunction[j].funcUsedCount,
              funcUsedDate: data[i].appFunction[j].funcUsedDate,
            }
            arr.push(buffer);
          }
        }
        let recentArr = JSON.parse(JSON.stringify(arr));
        let freqArr = JSON.parse(JSON.stringify(arr));

        //  최근 사용된 것으로 정렬
        recentArr.sort(function (a,b){
          if(a.funcUsedDate < b.funcUsedDate){
            return 1;
          }
          if(a.funcUsedDate > b.funcUsedDate){
            return -1;
          }
          return 0;
        });

        //  자주 사용된 것으로 정렬
        freqArr.sort(function (a,b){
          if(a.funcUsedCount < b.funcUsedCount){
            return 1;
          }
          if(a.funcUsedCount > b.funcUsedCount){
            return -1;
          }
          return 0;
        });
        this.setState({recentShowData:recentArr});
        this.setState({freqShowData:freqArr});
      });
      realm.close();
    }); 
  }

  componentDidMount(){

    this.filteredData();

  }

  render() {
    return (
      <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: 10
      }}>
      <Text>최근 사용</Text>
      <FlatList
        data={this.state.recentShowData}
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
              {item.appName} -  {item.funcName}
            </Text>
          </TouchableOpacity>

        )}
      />
      <Text>자주 사용</Text>
      <FlatList
        data={this.state.freqShowData}
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
              {item.appName} -  {item.funcName}
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