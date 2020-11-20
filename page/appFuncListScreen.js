import React,{
    useState, 
    useEffect,
} from 'react';
import { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    data,
    whatApp,
} from './appListScreen';

export default class appFuncListScreen extends Component {

  render() { 
    if(whatApp == '카카오톡'){
        console.log("hello");
    }


    return (
      <View>
        <Text>appListScreen</Text>
      </View>
    );
  }
}
/*
AndroidOpenSettings.generalSettings();
Linking.openURL('https://youtube.com');
*/