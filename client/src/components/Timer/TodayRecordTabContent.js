//오늘의 기록 탭
// TodayRecordTabContent.js
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import SpellingButton from './SpellingButton';
import ProofreadButton from './ProofreadButton';
import Button from '../Common/Button';
import { BLACK, GRAY, PRIMARY } from '../../colors';
import HR from '../Common/HR';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainRoutes } from '../../navigations/routes';
import PropTypes from 'prop-types';
import { fontScale } from '../../fontScale';


const TodayRecordTabContent = ({ onSave, recordText, setRecordText }) => {
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const handleSave = () => {
    if (recordText.trim()) {
      onSave(recordText);
    }
  };

  return (
    <View style={{ paddingHorizontal: 0, paddingBottom: bottom }}>
        {/* 상단 버튼 영역 */}
        <View style={styles.actionButtonsWrapper}>
          <SpellingButton title="맞춤법 검사" onPress={() => console.log('맞춤법 검사')} />
          <ProofreadButton title="교열 확인" onPress={() => console.log('교열 확인')} />
        </View>

        <HR styles={{
            container:{marginTop:-5,marginBottom:4},
            line:{borderBottomColor:PRIMARY.LIGHT, borderBottomWidth: 4}}}/>
        {/* 텍스트 필드 */}
        <TextInput
          style={styles.textarea}
          placeholder="오늘의 독서 기록을 해볼까요?"
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
  );
};

TodayRecordTabContent.propTypes = {
  onSave : PropTypes.func,
  recordText : PropTypes.string,
  setRecordText : PropTypes.func,
};

const styles = StyleSheet.create({
  actionButtonsWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  textarea: {
    borderWidth: 1,
    borderColor: GRAY.LIGHT,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: BLACK,
    minHeight: 203, //이거 이렇게까지 해야하나...어차피 ReadingTab 조절되면 또 바뀌어야하는데..
  },
});

export default TodayRecordTabContent;


