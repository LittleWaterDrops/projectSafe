import React, {
  Component,
} from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Switch,
  List,
} from 'react-native-paper';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';

export default class settingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingSwitch: false,
      youtubeSwitch: false,
      kakaotalkSwitch: false,
    };
  }

  componentDidMount(){
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        let data = realm.objects('data');
        this.setState({settingSwitch: data[0].authority});
        this.setState({youtubeSwitch: data[1].authority});
        this.setState({kakaotalkSwitch: data[2].authority});
      });
      realm.close();
    });
  }

render() { 
  const toggleSettingSwitch = () => {
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        if(this.state.settingSwitch == false){
          this.setState({settingSwitch: true});
          realm.objects('data')[0].authority = true;
        }
        else {
          this.setState({settingSwitch: false});
          realm.objects('data')[0].authority = false;
        }
      });
      realm.close();
    });
  }
  const toggleYoutubeSwitch = () => {
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        if(this.state.youtubeSwitch == false){
          this.setState({youtubeSwitch: true});
          realm.objects('data')[1].authority = true;
        }
        else {
          this.setState({youtubeSwitch: false});
          realm.objects('data')[1].authority = false;
        }
      });
      realm.close();
    });
  }
  const toggleKakaotalkSwitch = () => {
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        if(this.state.kakaotalkSwitch == false){
          this.setState({kakaotalkSwitch: true});
          realm.objects('data')[2].authority = true;
        }
        else {
          this.setState({kakaotalkSwitch: false});
          realm.objects('data')[2].authority = false;
        }
      });
      realm.close();
    });
  }
  
  return (
    <List.Section>
      <List.Item 
        title="설정" 
        left={() => <List.Icon icon="heart"/>} 
        right={() => 
          <Switch 
            value={this.state.settingSwitch} onValueChange={toggleSettingSwitch} 
          />
        } 
      />
      <List.Item
        title="유튜브"
        left={() => <List.Icon icon="youtube"/>}
        right={() => 
          <Switch 
            value={this.state.youtubeSwitch} onValueChange={toggleYoutubeSwitch} 
          />
        } 
      />
      <List.Item
        title="카카오톡"
        left={() => <List.Icon icon="message"/>}
        right={() => 
          <Switch 
          value={this.state.kakaotalkSwitch} onValueChange={toggleKakaotalkSwitch} 
          />
        } 
      />
      </List.Section>
    )
  }
}