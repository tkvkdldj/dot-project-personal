//독서모임 표지
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { GRAY, BLACK } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from '../../fontScale';
import PropTypes from "prop-types";

const imageMap = {
  bookclub1: require("../../../assets/images/bookclub1.png"),
  bookclub2: require("../../../assets/images/bookclub2.png"),
  bookclub3: require("../../../assets/images/bookclub3.jpg"),
};

const BookClub = ({imageKey, subject, clubTitle}) => {
    const { width: screenWidth } = Dimensions.get('window');
    const BOOK_WIDTH = screenWidth * 0.36;
    const BOOK_HEIGHT = BOOK_WIDTH * 1.3;

    return(
        <View style={{marginRight : 9}}>
            <Image 
            source={imageMap[imageKey]}
            style={{
                width : BOOK_WIDTH,
                height : BOOK_HEIGHT,
                resizeMode : 'stretch',
                marginBottom : 5,
            }}
            />
            <Text style={styles.subjectText}>{subject}</Text>
            <Text style={styles.clubTitle}>{clubTitle}</Text>
        </View>
    );
};

BookClub.propTypes = {
  imageKey : PropTypes.string.isRequired,
  subject : PropTypes.string.isRequired,
  clubTitle : PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    subjectText : {
        paddingVertical : 5,
        fontSize : fontScale(10),
        fontWeight : '600',
        color : GRAY.DARK,
    },
    clubTitle : {
        fontSize : fontScale(14),
        fontWeight : '600',
        color : BLACK,
    }



});

export default BookClub;