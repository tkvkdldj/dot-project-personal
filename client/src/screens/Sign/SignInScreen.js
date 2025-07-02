//로그인 화면 구현
import { useNavigation } from '@react-navigation/native'; // 화면 이동
import { Keyboard, StyleSheet, Text, View } from 'react-native'; // Image, Keyboard 추가 & ScrollView추가 -> 폼이 화면을 넘어가는 것 방지
import TextButton from "../../components/Common/TextButton"; // 로그인 이동 버튼
import Button from '../../components/Common/Button'; // 회원가입 버튼
import Input, {ReturnKeyTypes, InputTypes} from "../../components/Common/Input"; // 회원가입 텍스트 필드
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 상하좌우 화면 침범 막기
import SafeInputView from '../../components/Common/SafeInputView'; // 키보드가 화면 가리는 것 막기
import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { WHITE, PRIMARY } from "../../colors";
import { AuthRoutes } from '../../navigations/routes';

import axios from 'axios';//api통신
import { useUserState } from '../../contexts/UserContext'; //반환하는 user객체를 UserContext의 user에 저장하기 위함


const SignInScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets(); // 상하단 여백 값을 리턴 받음
  const passwordRef = useRef(); //비밀번호 -> 텍스트 필드 포커스 이동(참조객체 저장)
  const [email, setEmail] = useState(''); //이메일 관리 상태변수
  const [password, setPassword] = useState('') //비밀번호 관리 상태변수
  const [isLoading, setIsLoading] = useState(false) //로딩 인디게이터 표시 관리 변수
  const [disabled, setDisabled] = useState(false) //버튼 활성화 여부 관리 변수

  const [, setUser] = useUserState(); //UserContext에서 값을 받기 위함

  //이메일이나 패스워드 입력 여부에 따라 활성화/비활성화 결정
    useEffect(()=>{
        setDisabled(!email || !password);   //둘다 값이 들어있어야 true, 하나라도 없으면 false 
    },[email, password]);

  //로그인 api 요청
  const onSubmit = async() => {
    Keyboard.dismiss(); //키보드 사라짐

    if(!disabled && !isLoading){
      setIsLoading(true);
    
      try{
        const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
        });

        const { message, user } = response.data;
        setUser(user); //Context에 넣음
       
        console.log('로그인 성공!', message, user);

        // TODO: AsyncStorage 등에 토큰 저장 가능 (지금은 생략)
        // await AsyncStorage.setItem('token', response.data.token);
      }
      catch(error){
          const errMsg =
          error.response?.data?.message || '서버 연결 실패 또는 로그인 정보 오류';
          alert(errMsg);
      }finally{
          setIsLoading(false);
      }
    }


  };

  return (
    <SafeInputView>
        <View style={[styles.container, {paddingTop: top}]}>
        
        <Text style={styles.logo}>DOT</Text>
        <View style={[styles.form, {paddingBottom: bottom}]}>
            
            <Input
                value={email}
                inputType={InputTypes.EMAIL}
                onChangeText={(text)=>setEmail(text.trim())}
                returnKeyType={ReturnKeyTypes.NEXT}
                onSubmitEditing={()=>passwordRef.current.focus()}
                styles={{ 
                  container: {marginBottom : 15},
                  input : {borderRadius : 0}
                  
                }}
                showIcon={true}
                showTitle={false}
                showCheckButton={false}
            />
             <Input
                ref={passwordRef}
                value={password}
                inputType={InputTypes.PASSWORD}
                onChangeText={(text)=>setPassword(text.trim())}
                returnKeyType={ReturnKeyTypes.DONE}
                
                onSubmitEditing={onSubmit}
                // -> ()를 붙이면 즉시실행이 되기 때문(즉시실행 후 반환 값 전달), 
                // ()를 떼고 콜백으로 넘겨야 필요할 때만 호출이 되는 것(함수 참조 전달)
                styles={{ container : {marginBottom : 15},
               input : {borderRadius : 0}}}
                showIcon={true}
                showTitle={false}
                showCheckButton={false}
            />
            <Button
                title="로그인"
                onPress={onSubmit}
                disabled={disabled}
                isLoading={isLoading}
                styles={{container : {marginBottom : 10},
              button:{borderRadius:0, height : 60}}}
            />
            <TextButton
                title={'회원가입 하기'}
                onPress={()=>navigation.navigate(AuthRoutes.SIGN_UP_CHECK)}
                styles={{
                  title : {fontSize:14, fontWeight : '500'},
                  button : {marginTop : 5}
                }}
            />
            
            </View>
        </View>
        </SafeInputView>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  form: {
        width: '100%', //이걸 추가해줘야 양옆을 채운다
        alignItems : 'center',
        backgroundColor : WHITE,
        paddingHorizontal : 20,
        paddingTop : 30,
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
    },
  //챗지피티가 짜준 거
  logo: { fontSize: 120, fontWeight: 'regular', color: PRIMARY.DEFAULT, marginBottom: 10 },
  
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 45,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16 },
  loginButton: {
    backgroundColor: '#75C9F1',
    borderRadius: 20,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;