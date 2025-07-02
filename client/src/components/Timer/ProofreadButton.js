//교열 버튼
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE, GRAY, PRIMARY } from '../../colors';
import ProofreadIcon from '../../../assets/icons/proofread.svg';
import { Dimensions } from 'react-native';
import { fontScale } from '../../fontScale';

const ProofreadButton = ({ title, onPress }) => {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');
  const BUTTON_HEIGHT = SCREEN_HEIGHT * 0.043;

  return (
    <Pressable style={[styles.button,{height : BUTTON_HEIGHT}]} onPress={onPress}>
      <View style={styles.innerContainer}>
        {/* 아이콘은 나중에 여기에 추가 */}
        <ProofreadIcon width={18} height={18} style={{marginRight : 7}}/>
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
};

ProofreadButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    //height: 40,
    borderWidth: 1,
    borderColor: PRIMARY.LIGHT,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: fontScale(15),
    color: BLACK,
    fontWeight: '400',
  },
});

export default ProofreadButton;