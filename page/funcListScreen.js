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
      Linking,
  } from 'react-native';

export default class findListScreen extends Component {
 
  render() { 
    return (
      <View>
      <TouchableOpacity onPress={() => AndroidOpenSettings.generalSettings()}>
        
        <Text>setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com')}>
          
        <Text>youtube</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

