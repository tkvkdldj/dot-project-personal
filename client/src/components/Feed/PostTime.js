//작성된 시간
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../colors';
import { fontScale } from "../../fontScale";

const PostTime = ({ time }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.numberStyle}>{time}</Text>
    </View>
  );
};

PostTime.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const styles = StyleSheet.create({
  container: {
    marginTop : 15,
    //marginLeft : 50,
  },
  numberStyle : {
    fontSize : fontScale(14),
    fontWeight : '400',
    color : GRAY.DEFAULT,
  },
  
});

export default PostTime;