//피드에 도서 첨부
import { StyleSheet, Text, View, Image } from "react-native";
import { BLACK, WHITE, GRAY } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from "../../fontScale";
import PropTypes from "prop-types";

const imageMap = {
  feed1: require("../../../assets/images/feed1.jpg"),
  feed2: require("../../../assets/images/feed2.jpg"),
 
};

const AttachBook = ({imageKey, title, contents}) => {
    const { width: screenWidth, height : screenHeight } = Dimensions.get('window');
    const BOX_WIDTH = screenWidth * 0.9;
    const BOX_HEIGHT = screenHeight * 0.1;

    return(
        <View style={{marginVertical : 20}}>
           <View style={{
            backgroundColor : WHITE,
            width : BOX_WIDTH,
            height : BOX_HEIGHT,
            borderColor : GRAY.LIGHT,
            borderWidth : 1,
            flexDirection : 'row',
           }}>
            <Image
            source={imageMap[imageKey]}
            style={{
                width : BOX_WIDTH * 0.25,
                height : BOX_HEIGHT,
                resizeMode : 'cover'
            }}
            />
        
            <View style={{flexDirection : 'column', marginTop : BOX_HEIGHT * 0.08}}>
           <Text style={styles.titleText}>{title}</Text>
           <Text style={styles.contentstText}>{contents}</Text>
           </View>

           </View>
           </View>
        
    );
};

AttachBook.propTypes = {
  imageKey : PropTypes.string,
  title : PropTypes.string.isRequired,
  contents : PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    titleContainer: {
      flex: 1, // 남은 공간 차지
      justifyContent: 'flex-start',
    },  
    titleText : {
       marginTop : 14,
       marginBottom : 2,
        paddingHorizontal : 15,
        fontSize : fontScale(16),
        fontWeight : '600',
        color : BLACK, 
    },
    contentstText : {
        marginTop : 5,
        paddingHorizontal : 15,
        fontSize : fontScale(14),
        fontWeight : '400',
        color : BLACK,
    },



});

export default AttachBook;