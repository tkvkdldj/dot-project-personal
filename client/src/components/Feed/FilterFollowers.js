//팔로워 필터
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE, GRAY, PRIMARY } from '../../colors';
import Feather from '@expo/vector-icons/Feather';
import { fontScale } from '../../fontScale';

const FilterFollowers = ({ onPress }) => {
 
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.innerContainer}>
        <Feather name="circle" size={16} color={GRAY.DARK} />
        <Text style={styles.text}>팔로워</Text>
      </View>
    </Pressable>
  );
};

FilterFollowers.propTypes = {
  //title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    //flex: 1,
    height: 35,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: fontScale(13),
    color: GRAY.DARK, //색깔 매칭이 이상하잖아
    fontWeight: '400',
    marginLeft : 5,
  },
});

export default FilterFollowers;