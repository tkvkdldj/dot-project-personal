//자유피드의 책 소개
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { GRAY, BLACK } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from '../../fontScale';
import PropTypes from "prop-types";

const imageMap = {
  feed1: require("../../../assets/images/feed1.jpg"),
  feed2: require("../../../assets/images/feed2.jpg"),
  feed3: require("../../../assets/images/feed3.jpg"),
  feed4: require("../../../assets/images/feed4.jpg"),

  feed5 : require("../../../assets/images/feed5.jpg"),
  feed6 : require("../../../assets/images/feed6.jpg"),
  feed7 : require("../../../assets/images/feed7.jpg"),
  feed8 : require("../../../assets/images/feed8.jpg"),
};

const PostBook = ({imageKeys}) => {
    if (!imageKeys || imageKeys.length === 0) return null;

    const { width: screenWidth } = Dimensions.get('window');
    const BOOK_WIDTH = screenWidth * 0.2;
    const BOOK_HEIGHT = BOOK_WIDTH * 1.35;

    return(
    <ScrollView 
    horizontal 
    bounces={false}
    showsHorizontalScrollIndicator={false} 
    style={styles.scroll}>
      
      {imageKeys.map((key, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image
            source={imageMap[key]}
            style={{
              width: BOOK_WIDTH,
              height: BOOK_HEIGHT,
              resizeMode: 'stretch',
              marginBottom: 5,
            }}
          />
        </View>
      ))}
    </ScrollView>
    );
};

PostBook.propTypes = {
  imageKey : PropTypes.arrayOf(PropTypes.string),
};

const styles = StyleSheet.create({
    scroll: {
    marginTop : 10,
    marginLeft : 50,
  },
  imageContainer: {
    marginRight: 9,
  },

});

export default PostBook;