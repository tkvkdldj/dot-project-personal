//랜덤 어휘 미션 화면
import { StyleSheet, Text, View, TextInput } from "react-native";
import BackButton from "../../components/Common/BackButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckIcon from "../../../assets/icons/checkmark.svg";
import SpellingButton from "../../components/Timer/SpellingButton";
import ProofreadButton from "../../components/Timer/ProofreadButton";
import HR from "../../components/Common/HR";
import { PRIMARY, GRAY, BLACK} from "../../colors";
import { fontScale } from "../../fontScale";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MainRoutes } from "../../navigations/routes";

import axios from "axios";
import { useUserState } from '../../contexts/UserContext'; // 사용자 context
import Toast from "react-native-toast-message";

const RandomWordScreen = () => {
    const navigation = useNavigation();
    const { top, bottom } = useSafeAreaInsets();
    const [recordText, setRecordText] = useState(''); //글 저장하기 위한 변수

     const [user] = useUserState();

      //포인트 토스트 메시지
        const showPointToast = () => {
            Toast.show({
                 type: 'customPoint', //App.js
                 text1: `3 포인트 받았어요`,
                 position: 'top',
                 visibilityTime: 2000,
                 topOffset: 65,
             });
         };

    const onSave = async() => {
        const postData = {
            p_type: '랜덤어휘',
            p_subject: '솔선수범',
            p_content: recordText,
            p_u_idx: user.u_idx,
        };

          try {
            const response = await axios.post('http://localhost:3000/api/mission-post', postData);

            if (response.status === 200) {
                //지금은 강제로 3점 주긴하는데 원래 백엔드에서 3이라고 되돌려줘서 받아야함
                setTimeout(() => {
                    showPointToast();
                }, 100); 
                setTimeout(() => {
                        navigation.navigate(MainRoutes.MISSION_STACK, { screen: 'MissionComp' });
                }, 100);    
            }
            else {
              alert('데이터 넘기기 실패!');
            }
        } catch (error) {
            console.error('글 저장 실패:', error);
        }
    };

   return( 
        <View style={[styles.container, {paddingTop : top+5}]}>
            <View style={styles.backHeader}>
            <BackButton />
            <CheckIcon
                onPress={onSave}
            />
            </View>

            {/* 어휘 영역 */}
            <View style={styles.wordContainer}>
            <Text style={styles.wordStyle}>솔선수범</Text>
            </View>

            {/* 맞춤법,교열 버튼 영역 */}
            <View style={styles.actionButtonsWrapper}>
            <SpellingButton title="맞춤법 검사" onPress={() => console.log('맞춤법 검사')} />
            <ProofreadButton title="교열 확인" onPress={() => console.log('교열 확인')} />
            </View>

            {/* 글 작성 영역 */}
            <View>
             <HR styles={{
                        container:{marginTop:-5,marginBottom:15},
                        line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 4}}}/>
            <TextInput
                      style={styles.textarea}
                      placeholder="자유롭게 글을 작성해 볼까요?"
                      keyboardType='default'
                      placeholderTextColor={GRAY.DARK}
                      value={recordText}
                      onChangeText={setRecordText}
                      multiline={true}
                      numberOfLines={6}
                      textAlignVertical="top"
                      borderWidth={0}
                      fontSize={fontScale(14)}
                    />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        //justifyContent : 'center',
        //alignItems : 'center',
        paddingHorizontal : 15,
    },
    backHeader: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginLeft : 5,
    },
    wordContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        paddingVertical : 55,
    },  
    wordStyle : {
        fontSize : 35,
        fontWeight : '400',
    },
    actionButtonsWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
  },
  textarea: {
      borderWidth: 1,
      //borderColor: GRAY.LIGHT,
      //borderRadius: 4,
      padding: 12,
      fontSize: 16,
      color: BLACK,
      //minHeight: 203, //이거 이렇게까지 해야하나...어차피 ReadingTab 조절되면 또 바뀌어야하는데..
    },
});

export default RandomWordScreen;