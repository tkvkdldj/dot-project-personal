//토론의 장
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { GRAY, BLACK, WHITE, PRIMARY } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from '../../fontScale';
import PropTypes from "prop-types";

const imageMap = {
  discussion1: require("../../../assets/images/discussion1.jpg"),
  discussion2: require("../../../assets/images/discussion2.jpg"),
 
};

const DiscussCard = ({imageKey, subject, discussTitle, bookTitle, bookAuthor}) => {
    const { width: screenWidth, height : screenHeight } = Dimensions.get('window');
    const BOX_WIDTH = screenWidth * 0.6;
    const BOX_HEIGHT = screenHeight * 0.21;

    const WHITE_BOX_WIDTH = BOX_WIDTH * 0.92;
    const WHITE_BOX_HEIGHT = BOX_HEIGHT * 0.3;

    return(
        <View style={{marginRight : 10}}>
           <View style={{
            backgroundColor : GRAY.BRIGHT,
            width : BOX_WIDTH,
            height : BOX_HEIGHT,
           }}>
            {/* 제목 영역을 고정 높이로 만들기 */}
            <View style={styles.titleContainer}>
            <Text style={styles.discussTitle}>{discussTitle}</Text>
            <Text style={styles.subjectText}>{subject}</Text>
            </View>

            <View style={{
                alignSelf : 'center',
                flexDirection : 'row',
                alignItems : 'center',
                position: 'absolute',
                bottom: 12, // 아래에서 고정 거리
                backgroundColor : WHITE,
                width : WHITE_BOX_WIDTH,
                height : WHITE_BOX_HEIGHT,
           }}>
            <Image
            source={imageMap[imageKey]}
            style={{
                marginLeft : 7,
                width : WHITE_BOX_WIDTH * 0.17,
                height : WHITE_BOX_WIDTH * 0.17,
                resizeMode : 'stretch'
            }}
            />
            <View style={{
                flexDirection : 'column',
            }}>
            <Text style={styles.bookText}>{bookTitle}</Text>
            <Text style={styles.bookText}>{bookAuthor}</Text>
           </View>
           </View>
            


            </View>
           </View>
        
    );
};

DiscussCard.propTypes = {
  imageKey : PropTypes.string.isRequired,
  subject : PropTypes.string.isRequired,
  discussTitle : PropTypes.string.isRequired,
  bookTitle : PropTypes.string.isRequired,
  bookAuthor : PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1, // 남은 공간 차지
      justifyContent: 'flex-start',
    },
    subjectText : {
        paddingHorizontal : 15,
        fontSize : fontScale(14),
        fontWeight : '300',
        color : BLACK,
    },
    discussTitle : {
        marginTop : 3,
        paddingVertical : 16,
        paddingHorizontal : 15,
        fontSize : fontScale(15),
        lineHeight : fontScale(25),
        fontWeight : '600',
        color : BLACK,
        
    },
    bookText : {
        paddingVertical : 3,
        marginLeft : 7,
        fontSize : 13,
        fontWeight : '500',
        color : BLACK,
    }



});

export default DiscussCard;