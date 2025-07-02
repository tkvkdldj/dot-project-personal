//필사하기 좋은 시집
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { GRAY, BLACK } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from '../../fontScale';
import PropTypes from "prop-types";

const imageMap = {
  transcription1: require("../../../assets/images/transcription1.jpg"),
  transcription2: require("../../../assets/images/transcription2.jpg"),
  transcription3: require("../../../assets/images/transcription3.jpg"),
  transcription4: require("../../../assets/images/transcription4.jpg"),

  //원래 컴포넌트를 분리하던가....그러던가..
  recommend1 : require("../../../assets/images/recommend1.jpg"),
  recommend2 : require("../../../assets/images/recommend2.jpg"),
  recommend3 : require("../../../assets/images/recommend3.jpg"),
  recommend4 : require("../../../assets/images/recommend4.jpg"),
};

const TranscriptBook = ({imageKey, bookAuthor, bookTitle}) => {
    const { width: screenWidth } = Dimensions.get('window');
    const BOOK_WIDTH = screenWidth * 0.29;
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
            <Text style={styles.bookTitleText}>{bookTitle}</Text>
            <Text style={styles.bookAuthorText}>{bookAuthor}</Text>
        </View>
    );
};

TranscriptBook.propTypes = {
  imageKey : PropTypes.string.isRequired,
  bookAuthor : PropTypes.string.isRequired,
  bookTitle : PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    bookTitleText : {
        fontSize : fontScale(14),
        fontWeight : '600',
        color : BLACK,
        paddingVertical : 5,
    },
    bookAuthorText : { 
        addingVertical : 5,
        fontSize : fontScale(13),
        fontWeight : '400',
        color : BLACK,
    }



});

export default TranscriptBook;