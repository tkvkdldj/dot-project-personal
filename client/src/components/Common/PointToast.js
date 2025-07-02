import { View, Text, StyleSheet } from 'react-native';
import PointIcon from '../../../assets/icons/point.svg';
import { BLACK, WHITE } from '../../colors';
import { Dimensions } from 'react-native';
import { fontScale } from '../../fontScale';

const PointToast = ({ text1 }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const TOAST_HEIGHT = SCREEN_HEIGHT * 0.013;
  const TOAST_WIDTH = TOAST_HEIGHT * 2;
  return (
    <View style={[styles.toastContainer,{paddingHorizontal : TOAST_WIDTH, paddingVertical : TOAST_HEIGHT}]}>
      <PointIcon width={24} height={24} style={{ marginRight: 10 }} />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    backgroundColor: BLACK,
    //paddingVertical: 13,
    //paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  toastText: {
    color: WHITE,
    fontSize: fontScale(18),
    fontWeight: 'bold',
  },
});

export default PointToast;