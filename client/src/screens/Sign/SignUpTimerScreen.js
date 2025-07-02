import { StyleSheet, View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import TextButton from '../../components/Common/TextButton';
import Button from '../../components/Common/Button';
import { PRIMARY, GRAY, WHITE } from '../../colors';
import { AuthRoutes } from '../../navigations/routes';

const SignUpTimerScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();

  const [hour, setHour] = useState(30);
  const [minute, setMinute] = useState(30);
  const [tempHour, setTempHour] = useState('30');
  const [tempMinute, setTempMinute] = useState('30');

  const [editing, setEditing] = useState(null);
  const [hourSelection, setHourSelection] = useState(null);
  const [minuteSelection, setMinuteSelection] = useState(null);

  const applyTempToFinal = (type) => {
    const tempValue = type === 'hour' ? tempHour : tempMinute;
    const setter = type === 'hour' ? setHour : setMinute;
    const tempSetter = type === 'hour' ? setTempHour : setTempMinute;
    const current = parseInt(tempValue);
    const max = type === 'minute' ? 59 : 99;
    const valid = isNaN(current) ? 0 : Math.min(current, max);
    setter(valid);
    tempSetter(valid.toString());
  };

  const handleIncrement = (type) => {
    applyTempToFinal(type);
    if (type === 'hour') {
      const newVal = Math.min(parseInt(tempHour || '0') + 10, 99);
      setHour(newVal);
      setTempHour(newVal.toString());
    } else {
      const newVal = Math.min(parseInt(tempMinute || '0') + 10, 59);
      setMinute(newVal);
      setTempMinute(newVal.toString());
    }
  };

  const handleDecrement = (type) => {
    applyTempToFinal(type);
    if (type === 'hour') {
      const newVal = Math.max(parseInt(tempHour || '0') - 10, 0);
      setHour(newVal);
      setTempHour(newVal.toString());
    } else {
      const newVal = Math.max(parseInt(tempMinute || '0') - 10, 0);
      setMinute(newVal);
      setTempMinute(newVal.toString());
    }
  };

  const renderTimeField = (type, value) => {
    const tempValue = type === 'hour' ? tempHour : tempMinute;
    const tempSetter = type === 'hour' ? setTempHour : setTempMinute;
    const selection = type === 'hour' ? hourSelection : minuteSelection;
    const setSelection = type === 'hour' ? setHourSelection : setMinuteSelection;

    return editing === type ? (
      <TextInput
        style={styles.timeInput}
        value={tempValue}
        keyboardType="number-pad"
        selection={selection}
        onFocus={() => {
          setSelection({ start: 0, end: tempValue.length });
        }}
        onChangeText={(text) => tempSetter(text)}
        onSubmitEditing={() => {
          applyTempToFinal(type);
          setEditing(null);
          setSelection(null);
        }}
        onBlur={() => {
          applyTempToFinal(type);
          setEditing(null);
          setSelection(null);
        }}
        autoFocus
        maxLength={type === 'minute' ? 2 : 2}
        returnKeyType="done"
      />
    ) : (
      <Pressable
        onPress={() => {
          applyTempToFinal(editing); // 이전 값 먼저 저장
          setEditing(type);
          setTimeout(() => {
            const currentValue = type === 'hour' ? tempHour : tempMinute;
            const currentLength = currentValue.length;
            setSelection({ start: 0, end: currentLength });
          }, 0);
        }}
      >
        <Text style={styles.timeDisplay}>{value}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <View style={styles.header}>
        <TextButton
          title="〈"
          onPress={() => navigation.navigate(AuthRoutes.SIGN_UP_KEYWORD)}
          styles={{ title: styles.backButton }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <View style={styles.statusBar}>
            <View style={styles.statusBarFill} />
            <View style={styles.statusBarEmpty} />
          </View>
        </View>

        <View style={styles.introWrapper}>
          <Text style={styles.introMent}>
            {'한 주 목표 독서 시간을\n정해볼까요?'}
          </Text>
        </View>

        <View style={styles.timerWrapper}>
          <View style={styles.timerColumn}>
            <Pressable style={styles.circleButton} onPress={() => handleIncrement('hour')}>
              <Text style={styles.circleButtonText}>+</Text>
            </Pressable>
            {renderTimeField('hour', hour)}
            <Pressable style={styles.circleButton} onPress={() => handleDecrement('hour')}>
              <Text style={styles.circleButtonText}>−</Text>
            </Pressable>
          </View>

          <Text style={styles.colon}>:</Text>

          <View style={styles.timerColumn}>
            <Pressable style={styles.circleButton} onPress={() => handleIncrement('minute')}>
              <Text style={styles.circleButtonText}>+</Text>
            </Pressable>
            {renderTimeField('minute', minute)}
            <Pressable style={styles.circleButton} onPress={() => handleDecrement('minute')}>
              <Text style={styles.circleButtonText}>−</Text>
            </Pressable>
          </View>
        </View>

        <Button
          title="다음"
          onPress={() => {
            console.log(`설정된 시간: ${hour}시간 ${minute}분`)
            navigation.navigate(AuthRoutes.SIGN_UP_SUCCESS)
          }}
          styles={{ container: { marginTop: 80 } }}
          disabled={hour === 0 && minute === 0}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  header: { paddingHorizontal: 20, paddingBottom: 10 },
  backButton: { fontSize: 24, color: GRAY.DARK },
  content: { paddingHorizontal: 30, paddingBottom: 40 },
  statusBar: {
    flexDirection: 'row',
    width: '85%',
    height: 5,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 50,
  },
  statusBarFill: { flex: 1, backgroundColor: PRIMARY.DEFAULT },
  statusBarEmpty: { flex: 0, backgroundColor: PRIMARY.LIGHT },

  introWrapper: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 70,
  },
  introMent: {
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 32,
    textAlign: 'left',
  },
  timerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
  },
  timerColumn: {
    alignItems: 'center',
    gap: 8,
  },
  circleButton: {
    width: 90,
    height: 40,
    backgroundColor: GRAY.LIGHT,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 10,
  },
  circleButtonText: {
    marginTop : -5,
    fontSize: 40,
    fontWeight: '300',
  },
  timeDisplay: {
    fontSize: 80,
    fontWeight: 'regular',
  },
  timeInput: {
    fontSize: 80,
    fontWeight: 'regular',
    textAlign: 'center',
    width: 100,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT,
  },
  colon: {
    fontSize: 65,
    fontWeight: 'semibold',
    paddingHorizontal: 5,
    color : PRIMARY.LIGHT,
  },
});

export default SignUpTimerScreen;