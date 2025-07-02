import { StyleSheet, View, Text, ScrollView, Pressable, Keyboard } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextButton from '../../components/Common/TextButton';
import Button from '../../components/Common/Button';
import { PRIMARY, GRAY, WHITE } from '../../colors';
import { AuthRoutes } from '../../navigations/routes';

const KEYWORDS = [
  '에세이', '소설', '로맨스', '자서전', '미스터리', '판타지', '시', '스포츠',
  '고전 소설', '역사', '스릴러', '경제', '요리', '취미', '가정', '정치', '건강', '기타'
];

const SignUpKeywordScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  //const [isLoading, setIsLoading] = useState(false);
  //const [disabled, setDisabled] = useState(true);

  /*
  useEffect(() => {
    setDisabled();
  }, []);
*/
/*
  const onSubmit = () => {
    //Keyboard.dismiss();
    if (!disabled && !isLoading) {
      setIsLoading(true);
      console.log(nickname, email, password, passwordconfirm);
      setIsLoading(false);
    }
  };
*/
  return (
      <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <TextButton
          title="〈"
          onPress={() => navigation.navigate(AuthRoutes.SIGN_UP_FORM)}
          styles={{ title: styles.backButton }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        {/* 단계바 UI */}
        <View style={{alignItems:'center'}}>
        <View style={styles.statusBar}>
          <View style={styles.statusBarFill} />
          <View style={styles.statusBarEmpty} />
        </View>
        </View>
        
        {/* 인트로 멘트 */}
        <Text style={styles.introMent}>
          {'만나서 반가워요!\n좋아하는 도서 키워드가 무엇인지\n알려주세요!'}
        </Text>

        {/* 키워드 선택 버튼들 */}
        <View style={[styles.form, { paddingBottom: bottom }]}>
          {KEYWORDS.map((keyword) => (
            <TextButton
              key={keyword}
              title={keyword}
              onPress={() => toggleKeyword(keyword)}
              selected={selectedKeywords.includes(keyword)}
              keywordStyle={true}
            />
          ))}
        </View>

        {/* 다음 버튼 */}
        <Button
          title="다음"
          //onPress={() => console.log('선택된 키워드:', selectedKeywords)}
          onPress={()=>{
            console.log('선택된 키워드:', selectedKeywords)
            navigation.navigate(AuthRoutes.SIGN_UP_TIMER)}}
          styles={{ container: { marginTop: 300 } }}
          disabled={selectedKeywords.length === 0}
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
  statusBar: {
    flexDirection: 'row',
    width: '85%',
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 50,
  },
  statusBarFill: {
    flex: 1,
    backgroundColor: PRIMARY.DEFAULT,
  },
  statusBarEmpty: { //? 왜 필요하지
    flex: 1,
    backgroundColor: PRIMARY.LIGHT,
  },
  introMent: {
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 32,
    marginBottom: 20,
  },
  /*
  form: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: WHITE,
    //paddingHorizontal: 20,
    paddingTop: 30,
    paddingLeft : 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //버튼 모양
  keywordButton: {
        color: PRIMARY.DEFAULT,
        borderWidth: 1,
        borderColor: PRIMARY.DEFAULT,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 13,
    },

    keywordChoosed: {
        color: WHITE,
        backgroundColor : PRIMARY.DEFAULT,
        borderWidth: 1,
        borderColor: PRIMARY.DEFAULT,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 13,
    },
    */
   form: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    rowGap: 12,
    justifyContent: 'flex-start',
  },
  
});

export default SignUpKeywordScreen;
