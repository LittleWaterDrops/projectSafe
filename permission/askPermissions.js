import React,{
  Component,
} from 'react';
import {
    PermissionsAndroid,
    Platform,
    Alert,
} from 'react-native';
import Realm from 'realm';
import {
  dataSchema,
  appFuncSchema,
} from '../schema/shcema';

export class askPermissions extends Component  {

  askStoragePermission = async function () {
    if (Platform.OS === 'android') {  
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "저장소 사용 권한",
        message: "이 어플리케이션이 정상적으로 동작하기 위해서는 저장소 권한이 필요합니다. 허용하시겠습니까?",
        buttonPositive: "네",
        buttonNegative: "아니요"
      }
      );
    }
  }

  checkAuthority (bool) {
    Realm.open({schema:[dataSchema,appFuncSchema]})
    .then(realm => {
      realm.write(() => {
        let data = realm.objects('data');
          for(let i = 0; i < data.length; i++){
            data[i].authority = bool;
          }
      });
    });  
    if(bool == false){
      alert(' \"기본 앱\" (설정, 유튜브) 안내 권한이 부여되지 않았습니다.\n\n 안내 사용을 원할 시 \'앱 리스트 설정\'에서 해당 앱에 대해 안내 권한 부여 부탁드립니다.\n');
    } 
    else {
      alert(' \"기본 앱\" (설정, 유튜브) 안내 권한이 부여되었습니다.\n');

    } 
  }
  
  defaultAppAnnounceAlert = function () {

    Alert.alert(
      "기본앱 안내",
      "기본앱 (설정, 유튜브) 안내를 사용하시겠습니까?",
      [
        {
          text: "사용함",
          onPress: () => { this.checkAuthority(true) },
        },
        { text: "사용안함", onPress: () => {  this.checkAuthority(false) } 
        },
      ],
      { cancelable: false }
    );
  }

    
}
const askPermissionsClass = new askPermissions();
export default askPermissionsClass;
  /*
    // 안드로이드 권한 관련 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  ///
        const granted = await PermissionsAndroid.request(                                                                             ///
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          [{
            title: "저장소 사용 권한",
            message: "이 어플리케이션이 정상적으로 동작하기 위해서는 저장소 권한이 필요합니다. 허용하시겠습니까?",
            buttonPositive: "네",
            buttonNegative: "아니요"
          }]).then((result) => {                                                                                                            ///
          if (result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted')                                                        ///
          {                                                                                                                             ///
            let permissionAllowed = new Date().getTime();                                                                               ///
            alert(moment(permissionAllowed).format('YYYY년 MM월 DD일 HH시 mm분 \n\n 모든 권한이 허락되었습니다. 앱 사용이 가능합니다.'));    ///
          }                                                                                                                             ///
          else                                                                                                                          ///
          {                                                                                                                             ///
            // 사용자가 거절한 항목들 배열로 저장 후 출력                                                                                  ///
            let permissionDenied = [];                                                                                                  ///
            if(result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'){                                                      ///
              console.log("PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE : true");                                              ///
            }                                                                                                                           ///
            else{                                                                                                                       ///
              permissionDenied.push('저장소');                                                                                           ///
              console.log("PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE : false");                                             ///
            }                                                                                                                           ///
            alert(String(permissionDenied) + ' 권한\n이 불허되었습니다. \n\n어플이 정상 작동하지 않을 수 있습니다. \n\n정상 작동을 위해서 권한을 부여해주시기 바랍니다. \n\n앱 -> 앱 정보 -> 권한 -> 권한 부여\n\n');
          }                                                                                                                             ///
        });                                                                                                                             ///
      }                                                                                                                                 ///
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}*/