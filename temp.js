import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  LogBox,
} from 'react-native';
import {
  Switch,
  List,
} from 'react-native-paper';

export default class settingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingSwitch: false,
      kakaotalkSwitch: false,
      youtubeSwitch: false,
    };
  }

  render() { 
  const toggleSettingSwitch = () => (this.state.settingSwitch == false) ? this.setState({settingSwitch: true}) : this.setState({settingSwitch: false});
  const toggleKakaotalkSwitch = () => (this.state.kakaotalkSwitch == false) ? this.setState({kakaotalkSwitch: true}) : this.setState({kakaotalkSwitch: false});
  const toggleYoutubeSwitch = () => (this.state.youtubeSwitch == false) ? this.setState({youtubeSwitch: true}) : this.setState({youtubeSwitch: false});

  
  return (
    <List.Section>
    <List.Item 
      title="설정" 
      left={() => <List.Icon icon="heart"/>} 
      right={() => 
    <Switch 
      value={this.state.settingSwitch} onValueChange={toggleSettingSwitch} 
    />} 
    />
    <List.Item
      title="유튜브"
      left={() => <List.Icon icon="youtube"/>}
      right={() => 
        <Switch 
          value={this.state.youtubeSwitch} onValueChange={toggleYoutubeSwitch} 
        />} 
    />
    <List.Item
      title="카카오톡"
      left={() => <List.Icon icon="message"/>}
      right={() => 
        <Switch 
        value={this.state.kakaotalkSwitch} onValueChange={toggleKakaotalkSwitch} 
        />} 
    />

    </List.Section>
    )
  }
}
const styles = StyleSheet.create({
  subTitle: {
    fontSize: 20,
    textAlign:'center',
  },
  appListText: {
    fontSize: 80,
  }
});