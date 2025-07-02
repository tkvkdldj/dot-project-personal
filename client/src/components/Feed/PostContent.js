//게시글 본문
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, BLACK } from '../../colors';
import { fontScale } from "../../fontScale";

const PostContent = ({ title, text }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop : 15,
    marginLeft : 50,
  },
  titleStyle : {
    fontSize : fontScale(21),
    fontWeight : '600',
    color : BLACK,
    marginBottom : 15,
  },
  textStyle : {
    fontSize : fontScale(14),
    fontWeight : '400',
    color : BLACK,
    lineHeight: fontScale(24), // ← 이게 핵심!
  },
});

export default PostContent;