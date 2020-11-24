import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    Image,
} from 'react-native';
import filter from 'lodash.filter'
import { Searchbar } from 'react-native-paper';
import { runTutorial } from './appFuncListScreen';
import { data } from '../findFuncScreen';
import styles from '../customAssets/style';
import logoSource from '../customAssets/logoSource';

export default class searchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedData: [],
      showData: [],
      searchQuery: '',
      initialSettingData: [],
      initialYoutubeData: [],
      showSettingData:[],
      showYoutubeData:[],
    };
  }

  initialData() {
    let initialSettingArr = [];
    let initialYoutubeArr = [];
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
        if(i == 0){
          initialSettingArr.push(buffer);
        }
        else if (i == 1){
          initialYoutubeArr.push(buffer);
        }
        arr.push(buffer);
        count ++;
      }
    }
    this.setState({changedData:arr});
    this.setState({initialSettingData:initialSettingArr});
    this.setState({initialYoutubeData:initialYoutubeArr});
  }

  componentDidMount(){
    this.initialData();
  }

  onChangeSearch = (query) => {
    this.setState({searchQuery: query});

    const buffer = filter(this.state.changedData, function (findText){
      return findText.funcName.includes(query) || findText.appName.includes(query) ;
    });

    if(query == ''){
      console.log('query null');
    }
    else {
      this.setState({showData:buffer});
    }

    let setArr = [];
    let youArr = [];

    for(let i = 0; i< buffer.length;i++){
      if(buffer[i].appName == '설정'){
        setArr.push(buffer[i]);
      }
      if(buffer[i].appName == '유튜브'){
        youArr.push(buffer[i]);

      }
    }
    this.setState({showSettingData: setArr});
    this.setState({showYoutubeData: youArr});
  }

  checkSetting(){
    let flag = false;
    for(let i = 0; i< this.state.showData.length;i++){
      flag = true;
      if(this.state.showData[i].appName == '유튜브'){
        return false;
      }
    }
    if(flag == true){
      console.log(this.state.showData);
      console.log(flag);
      return true;
    }
  }

  checkYoutube(){
    let flag = false;
    for(let i = 0; i< this.state.showData.length;i++){
      flag = true;
      if(this.state.showData[i].appName == '설정'){
        return false;
      }
    }
    if(flag == true){
      console.log(this.state.showData);
      console.log(flag);
      return true;
    }
  }

  checkBoth(){
    let settingFlag = false;
    let youtubeFlag = false;


    for(let i = 0; i< this.state.showData.length;i++){
      if(this.state.showData[i].appName == '설정'){
        settingFlag = true;
      }
      if(this.state.showData[i].appName == '유튜브'){
        youtubeFlag = true;

      }
    }
    if(settingFlag == true && youtubeFlag == true){

      return true;
    }
  }


  render() {
    if (this.state.searchQuery ==''){
      return (
        <View
          style={styles.viewStyle}>
          <Searchbar
            clearButtonMode= 'while-editing'
            placeholder='앱 이름 / 기능 검색'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            style={styles.searchBox}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 설정 </Text>
          </View>
          <FlatList
            data={this.state.initialSettingData}
            keyExtractor={item => item.funcName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 유튜브 </Text>
          </View>
          <FlatList
            data={this.state.initialYoutubeData}
            keyExtractor={item => item.funcName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    else if (this.checkSetting()) {
      return (
        <View
          style={styles.viewStyle}>
          <Searchbar
            clearButtonMode= 'while-editing'
            placeholder='앱 이름 / 기능 검색'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            style={styles.searchBox}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 설정 </Text>
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
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    else if(this.checkYoutube()){
      return (
        <View
          style={styles.viewStyle}>
          <Searchbar
            clearButtonMode= 'while-editing'
            placeholder='앱 이름 / 기능 검색'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            style={styles.searchBox}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 유튜브 </Text>
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
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    else if(this.checkBoth()){
      return (
        <View
          style={styles.viewStyle}>
          <Searchbar
            clearButtonMode= 'while-editing'
            placeholder='앱 이름 / 기능 검색'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            style={styles.searchBox}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 설정 </Text>
          </View>
          <FlatList
            data={this.state.showSettingData}
            keyExtractor={item => item.funcName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 유튜브 </Text>
          </View>
          <FlatList
            data={this.state.showYoutubeData}
            keyExtractor={item => item.funcName}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => runTutorial(item.appName,item.funcID,item.funcName)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                </View>
                <Text style={styles.textList}>
                  {<Image style={{width: 20, height: 20}} source={logoSource.setLogo(item.appName)}/>} {item.funcName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      );
    }
    else{
      return (
        <View
          style={styles.viewStyle}>
          <Searchbar
            clearButtonMode= 'while-editing'
            placeholder='앱 이름 / 기능 검색'
            onChangeText={this.onChangeSearch}
            value={this.state.searchQuery}
            style={styles.searchBox}
          />
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 설정 </Text>
          </View>
          
          <View style={{borderBottomColor:"#979EA6", 
            borderBottomWidth: 1}}>
            <Text style={styles.textSubtitle}> 유튜브 </Text>
          </View>
          
        </View>
      );
    }
  }
}