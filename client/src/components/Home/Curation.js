//이 달의 큐레이션
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { GRAY, BLACK, WHITE, PRIMARY } from "../../colors";
import { Dimensions } from 'react-native'; //반응형 대비 화면 크기
import { fontScale } from '../../fontScale';
import PropTypes from "prop-types";

const imageMap = {
  curation1: require("../../../assets/images/curation1.png"),
  curation2: require("../../../assets/images/curation2.jpg"),
 
};

const Curation = ({imageKey, title, contents}) => {
    const { width: screenWidth, height : screenHeight } = Dimensions.get('window');
    const BOX_WIDTH = screenWidth * 0.6;
    const BOX_HEIGHT = screenHeight * 0.25;

    return(
        <View style={{marginRight : 10}}>
           <View style={{
            backgroundColor : GRAY.BRIGHT,
            width : BOX_WIDTH,
            height : BOX_HEIGHT,
           }}>
            <Image
            source={imageMap[imageKey]}
            style={{
                width : BOX_WIDTH,
                height : BOX_HEIGHT * 0.7,
                resizeMode : 'cover'
            }}
            />
            
           <Text style={styles.titleText}>{title}</Text>
           <Text style={styles.contentstText}>{contents}</Text>
           
           </View>
           </View>
        
    );
};

Curation.propTypes = {
  //imageKey : PropTypes.string.isRequired,
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
        paddingHorizontal : 15,
        fontSize : fontScale(15),
        fontWeight : '600',
        color : BLACK, 
    },
    contentstText : {
        marginTop : 5,
        paddingHorizontal : 15,
        fontSize : fontScale(12),
        fontWeight : '400',
        color : BLACK,
    },



});

export default Curation;