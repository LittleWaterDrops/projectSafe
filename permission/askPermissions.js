import React,{
  useState, 
  useEffect,
} from 'react';
import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
    Modal,
    Alert,
    Button,
} from 'react-native';
import moment from 'moment';

export class askPermissions {
  
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
      // if(granted === PermissionsAndroid.RESULTS.GRANTED){
      //   alert("yes");
      // }else {
      //   alert("no");
      // }
    }
  }
  voiceAnnounceAlert () {
    Alert.alert(
      "음성 안내",
      "음성 안내를 사용하시겠습니까?",
      [
        {
          text: "사용함",
          onPress: () => {console.log("사용함")},
        },
        { text: "사용안함", onPress: () => {console.log("사용안함")} }
      ],
      { cancelable: false }
    );
  }

  defaultAppAnnounceAlert () {
    Alert.alert(
      "기본앱 안내",
      "기본앱(카카오톡,유튜브,설정) 안내를 사용하시겠습니까?",
      [
        {
          text: "사용함",
          onPress: () => {console.log("사용함")},
        },
        { text: "사용안함", onPress: () => {console.log("사용안함")} }
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