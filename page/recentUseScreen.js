import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Text,
} from 'react-native';
import styles from './style';
import {
  runTutorial,
} from './appFuncListScreen';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';



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
        style={styles.viewStyle}>
        <View
          style={{
          borderBottomColor: '#979EA6',
          borderBottomWidth: 1,
		    }}>
		      <Text style={styles.textSubtitle}>최근 사용</Text>
	      </View>
        <FlatList
          data={this.state.recentShowData}
          keyExtractor={item => item.funcName}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingRight: 15,
                  alignItems: 'center'
                }}>
              </View>
              <Text style={ styles.textList }>
                {item.appName} -  {item.funcName}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
          borderBottomColor: '#979EA6',
          borderBottomWidth: 1,
          }}>
          <Text style={styles.textSubtitle}>자주 사용</Text>
        </View>
        <FlatList
          data={this.state.freqShowData}
          keyExtractor={item => item.funcName}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingRight: 15,
                  alignItems: 'center',
              }}>
              </View>
              <Text style={styles.textList}>
                {item.appName} -  {item.funcName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
