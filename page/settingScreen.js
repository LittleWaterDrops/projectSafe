import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Image,
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
import logoSource from '../customAssets/logoSource';

export default class settingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingSwitch: false,
      youtubeSwitch: false,
    };
  }

  componentDidMount(){
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        let data = realm.objects('data');
        this.setState({settingSwitch: data[0].authority});
        this.setState({youtubeSwitch: data[1].authority});
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
  
  return (
    <List.Section>
      <List.Item 
        title="설정" 
        left={() => <Image style={{width: 20, height: 20}} source={logoSource.setLogo('설정')}/>}
        right={() => 
          <Switch 
            value={this.state.settingSwitch} onValueChange={toggleSettingSwitch} 
          />
        } 
      />
      <List.Item
        title="유튜브"
        left={() => <Image style={{width: 20, height: 20}} source={logoSource.setLogo('유튜브')}/>}
        right={() => 
          <Switch 
            value={this.state.youtubeSwitch} onValueChange={toggleYoutubeSwitch} 
          />
        } 
      />
      </List.Section>
    )
  }
}