import { StyleSheet, View, Text, ScrollView, Pressable, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Input, { ReturnKeyTypes, InputTypes } from '../../components/Common/Input';
import SafeInputView from '../../components/Common/SafeInputView';
import TextButton from '../../components/Common/TextButton';
import Button from '../../components/Common/Button';
import { PRIMARY, GRAY, WHITE } from '../../colors';
import { AuthRoutes } from '../../navigations/routes';


/* 데이트피커랑 이미지첨부를 추가해놓자 */

const SignUpFormScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfrimRef = useRef();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirm, setPasswordconfirm] = useState('');
  const [birth, setBirth] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(nickname && email && password && passwordconfirm));
  }, [nickname, email, password, passwordconfirm]);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      console.log(nickname, email, password, passwordconfirm);
      setIsLoading(false);
    }
  };

  return (
    <SafeInputView>
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
        <View style={styles.header}>
          <TextButton
            title="〈"
            onPress={() => navigation.navigate(AuthRoutes.SIGN_UP_CHECK)}
            styles={{ title: styles.backButton }}
          />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.profileBox}>
            
          </View>

          <View style={[styles.form, { paddingBottom: bottom }]}>
            <View style={styles.inputRow}>
              <Input
                value={nickname}
                inputType={InputTypes.NICKNAME}
                onChangeText={(text) => setNickname(text.trim())}
                returnKeyType={ReturnKeyTypes.NEXT}
                onSubmitEditing={() => emailRef.current.focus()}
                styles={{ container: { flex: 1 } }}
                showIcon={false}
                showTitle={true}
                showCheckButton={true}
                isRequired={true} 
              />
            </View>

            <View style={styles.inputRow}>
              <Input
                ref={emailRef}
                value={email}
                inputType={InputTypes.EMAIL}
                onChangeText={(text) => setEmail(text.trim())}
                returnKeyType={ReturnKeyTypes.NEXT}
                onSubmitEditing={() => passwordRef.current.focus()}
                styles={{ container: { flex: 1 } }}
                showIcon={false}
                showTitle={true}
                showCheckButton={true}
                isRequired={true} 
              />
            </View>

            <Input
              ref={passwordRef}
              value={password}
              inputType={InputTypes.PASSWORD}
              onChangeText={(text) => setPassword(text.trim())}
              returnKeyType={ReturnKeyTypes.NEXT}
              onSubmitEditing={() => passwordConfrimRef.current.focus()}
              styles={{ container: { marginBottom: 20 } }}
              showIcon={false}
              showTitle={true}
              isRequired={true} 
            />

            <Input
              ref={passwordConfrimRef}
              value={passwordconfirm}
              inputType={InputTypes.PASSWORD_CONFIRM}
              onChangeText={(text) => setPasswordconfirm(text.trim())}
              returnKeyType={ReturnKeyTypes.DONE}
              onSubmitEditing={onSubmit}
              styles={{ container: { marginBottom: 20 } }}
              showIcon={false}
              showTitle={true}
              isRequired={true} 
            />

            <View style={styles.birthRow}>
              <Text style={styles.birthLabel}>생년월일</Text>
              <Pressable style={styles.birthBox}>
                <Text style={styles.birthPlaceholder}>2025 | 05 | 14</Text>
              </Pressable>
            </View>
          </View>

          <Button
            title="다음"
            onPress={()=>navigation.navigate(AuthRoutes.SIGN_UP_KEYWORD)}
            styles={{ container: { marginTop: 20 } }}
            disabled={disabled}
          />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    fontSize: 24,
    color: GRAY.DARK,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  profileBox: {
    paddingBottom: 170,
    marginRight: 100,
    marginLeft: 100,
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor : PRIMARY.LIGHT
  },
  form: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: WHITE,
    //paddingHorizontal: 20,
    paddingTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkButton: {
    borderWidth: 1,
    borderColor: PRIMARY.DEFAULT,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 10,
  },
  checkButtonText: {
    color: PRIMARY.DEFAULT,
    fontWeight: '700',
    fontSize: 14,
  },
  birthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft : 20,
  },
  birthLabel: {
    marginRight: 10,
    fontWeight: '700',
  },
  birthBox: {
    flex: 1,
    borderColor: GRAY.DARK,
    paddingVertical: 12,
    //alignItems: 'center',
  },
  birthPlaceholder: {
    color: GRAY.DARK,
  },
});

export default SignUpFormScreen;
