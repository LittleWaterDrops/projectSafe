import { Component } from 'react';


export class logoSource extends Component {
  setLogo(appName) {
    switch(appName){
      case '설정':
        return (require('../customAssets/logo/setting_logo.png'));
        break;
      case '유튜브':
        return (require('../customAssets/logo/youtube_logo.png'));
        break;      
      case '카카오톡':
        return (require('../customAssets/logo/kakaotalk_logo.png'));
        break;
    }   
  };
}

const logoSourceClass = new logoSource();
export default logoSourceClass;