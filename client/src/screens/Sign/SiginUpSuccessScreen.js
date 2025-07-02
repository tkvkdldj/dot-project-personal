import { StyleSheet, View, Text, ScrollView, Pressable, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '../../components/Common/Button';
import { PRIMARY, GRAY, WHITE } from '../../colors';
import { AuthRoutes } from '../../navigations/routes';
import { Octicons } from '@expo/vector-icons';

const SignUpSuccessScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  return (
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
    
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* 인트로 멘트 */}
        <Octicons name="check-circle-fill" style={{marginTop : 200, marginLeft : 130, marginBottom : 50, color : PRIMARY.DEFAULT}} size={100} color="black" />
       
        
        <Text style={styles.introMent}>
          {'회원가입 완료!'}
        </Text>

        {/* 로그인 이동 버튼 */}
        <Button
          title="로그인"
          onPress={()=>{
            navigation.navigate(AuthRoutes.SIGN_IN)}}
          styles={{ container: { marginTop: 170 } }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  
  content: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  
  introMent: {
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 32,
    //marginTop: 350,
    marginLeft : 110,
  },
   form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 12,
    justifyContent: 'flex-start',
  },
  
});

export default SignUpSuccessScreen;
