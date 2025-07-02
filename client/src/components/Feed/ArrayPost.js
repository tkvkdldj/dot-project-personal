//최신순 등 게시글 정렬
import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, WHITE, GRAY, PRIMARY } from '../../colors';
import Feather from '@expo/vector-icons/Feather';
import { fontScale } from '../../fontScale';

const ArrayPost = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>최신순</Text>
        <Feather name="align-left" size={20} color={GRAY.DARK} />
      </View>
    </Pressable>
  );
};

ArrayPost.propTypes = {
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
    marginRight : 3,
  },
});

export default ArrayPost;